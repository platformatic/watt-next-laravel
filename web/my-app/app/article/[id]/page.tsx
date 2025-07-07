import Link from 'next/link';
import { notFound } from 'next/navigation';

// Laravel API URL
const LARAVEL_API_URL = 'http://localhost:3042/laravel/api';

// Define Article type
interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

// Fetch individual article
async function getArticle(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/articles/${id}`, {
      next: { revalidate: 0 }
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Article header */}
            <header className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center text-gray-600 text-sm">
                <time dateTime={article.published_at} className="mr-4">
                  {formatDate(article.published_at)}
                </time>
                {article.author && (
                  <>
                    <span className="mr-2">•</span>
                    <span>By {article.author}</span>
                  </>
                )}
              </div>
            </header>

            {/* Article excerpt */}
            {article.excerpt && (
              <div className="text-xl text-gray-700 mb-8 font-light leading-relaxed">
                {article.excerpt}
              </div>
            )}

            {/* Article content */}
            <div 
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt || `Read ${article.title} on our blog`,
    openGraph: {
      title: article.title,
      description: article.excerpt || `Read ${article.title} on our blog`,
      type: 'article',
      publishedTime: article.published_at,
      authors: article.author ? [article.author] : [],
    },
  };
}