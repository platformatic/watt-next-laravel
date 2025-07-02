/* SPDX-License-Identifier: Apache-2.0 */
// app/blog/page.js
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import RssParser from 'rss-parser';

const parser = new RssParser();

// Replace with your Symfony site URL
// const SYMFONY_URL = 'http://symfony.plt.local';
const SYMFONY_URL = 'http://localhost:3042/symfony';

// Server component to fetch posts
async function getPosts() {
  try {
    const feed = await parser.parseURL(`${SYMFONY_URL}/en/blog/rss.xml`);
    return feed.items
  } catch (error) {
    console.error('Error fetching Symfony posts:', error);
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
function PostCard({ post }) {
  const author = post.author;
  const categories = post.categories.slice(0, 3) || [];

  // return (
  //   <div>
  //     {JSON.stringify(post)}
  //   </div>
  // );

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          <Link
            href={post.link}
            className="hover:text-blue-600 transition-colors duration-200 line-clamp-2"
          >
            <span>{post.title}</span>
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {stripHtml(post.description || '')}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
          {author && <span>By {author}</span>}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={post.link}
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

  let posts = [];
  let error = null;

  posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest articles, insights, and updates
          </p>
        </header>

        {posts.length === 0 ? (
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
            {posts.map((post) => (
              <PostCard key={post.guid} post={post} />
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
