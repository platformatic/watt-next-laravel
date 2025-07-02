/* SPDX-License-Identifier: Apache-2.0 */
// app/blog/page.js
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';

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

interface PaginatedResponse {
  data: Article[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Server component to fetch posts
async function getPosts(): Promise<Article[]> {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/articles`, {
      next: { revalidate: 0 } // Disable caching for now
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: PaginatedResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching Laravel posts:', error);
    throw error;
  }
}

// Utility functions
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Post Card Component
function PostCard({ article }: { article: Article }) {
  const author = article.author;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          <Link
            href={`/article/${article.id}`}
            className="hover:text-blue-600 transition-colors duration-200 line-clamp-2"
          >
            <span>{article.title}</span>
          </Link>
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
          {author && <span>By {author}</span>}
        </div>

        {/* Read More Link */}
        <Link
          href={`/article/${article.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          Read More
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Loading Component
function BlogSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="flex justify-between mb-4">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const revalidate = 0

// Main Blog Page Component
export default async function BlogPage() {
  'use server'

  let articles: Article[] = [];
  let error = null;

  try {
    articles = await getPosts();
  } catch (err) {
    error = err;
    console.error('Failed to fetch articles:', err);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest articles, insights, and updates
          </p>
        </header>

        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">Error loading articles</p>
              <p className="text-sm mt-2">Please try again later</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-lg">No blog posts found</p>
              <p className="text-sm mt-2">Check back later for new content!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <PostCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Blog | Your Site Name',
    description: 'Read our latest blog posts, articles, and insights.',
    openGraph: {
      title: 'Blog | Your Site Name',
      description: 'Read our latest blog posts, articles, and insights.',
      type: 'website',
    },
  };
}
