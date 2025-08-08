"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Demo post data (replace with real data or fetch from backend later)
// TODO: Add category support to posts for future filtering
const posts = [
  {
    slug: "demo-all-features",
    title: "Demo: All Blog Features",
    date: "2025-07-27",
    tags: ["demo", "features", "markdown"],
    excerpt: "A demonstration of all supported blog features: code, quotes, links, images, and more!",
    cover: "/images/captains-log/welcome.jpg",
  },
  {
    slug: "welcome-to-the-captains-log",
    title: "Welcome to The Captain's Log!",
    date: "2025-07-26",
    tags: ["intro", "news"],
    excerpt: "Announcing our new blog for devlogs, news, and tips!",
    cover: "/images/captains-log/welcome.jpg",
  },
  {
    slug: "ai-art-gallery-behind-the-scenes",
    title: "AI Art Gallery: Behind the Scenes",
    date: "2025-07-20",
    tags: ["gallery", "ai", "devlog"],
    excerpt: "A peek into how the AI Art Gallery was built and what makes it tick.",
    cover: "/images/captains-log/ai-art.jpg",
  },
];

import { useState } from "react";

export default function CaptainsLogPage() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("newest");
  // TODO: Add category state and filter when categories are implemented

  // Filter posts by search and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
      // TODO: Optionally search post.content for advanced search
    const matchesTag = tag ? post.tags.includes(tag) : true;
    // TODO: Add category filter when categories are present
    return matchesSearch && matchesTag;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    return 0;
  });

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  // TODO: const allCategories = ... (when categories are added)

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent drop-shadow"
      >
        📝 The Captain&apos;s Log
      </motion.h1>
      <p className="text-center text-lg mb-6 text-gray-600 dark:text-gray-300">
        News, devlogs, and tips from RocketMobster Software.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 items-center justify-center" role="search" aria-label="Blog search and filters">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 dark:border-gray-700 rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-yellow-100 font-semibold"
          aria-label="Search blog posts"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border border-gray-400 dark:border-gray-700 rounded px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-yellow-100 font-semibold"
          aria-label="Filter by tag"
        >
          <option value="" className="text-gray-900 dark:text-yellow-100">All Tags</option>
          {allTags.map((t) => (
            <option key={t} value={t} className="text-gray-900 dark:text-yellow-100">
              #{t}
            </option>
          ))}
        </select>
        {/* TODO: Add category filter dropdown here when categories are implemented */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-400 dark:border-gray-700 rounded px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-yellow-100 font-semibold"
          aria-label="Sort posts"
        >
          <option value="newest" className="text-gray-900 dark:text-yellow-100">Newest First</option>
          <option value="oldest" className="text-gray-900 dark:text-yellow-100">Oldest First</option>
          <option value="az" className="text-gray-900 dark:text-yellow-100">A–Z</option>
          <option value="za" className="text-gray-900 dark:text-yellow-100">Z–A</option>
        </select>
      </div>
      <div className="space-y-8">
        {sortedPosts.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">No posts found.</div>
        )}
        {sortedPosts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-white/80 dark:bg-gray-900/80 shadow-lg p-6 flex flex-col sm:flex-row gap-4 hover:scale-[1.02] transition-transform"
          >
            <div className="flex-shrink-0 w-full sm:w-40 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center" aria-hidden="true">
              {/* Placeholder for cover image */}
              <span className="text-4xl">🚀</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link href={`/captains-log/${post.slug}`} className="text-2xl font-semibold text-blue-600 dark:text-yellow-400 hover:underline" aria-label={`Read post: ${post.title}`}>
                  {post.title}
                </Link>
                <div className="text-sm text-gray-500 mt-1">{new Date(post.date).toLocaleDateString()}</div>
                <div className="flex flex-wrap gap-2 mt-2" aria-label="Post tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-100 px-2 py-0.5 rounded text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-gray-700 dark:text-gray-200">{post.excerpt}</p>
                {/* TODO: Ensure all future images have alt text and loading="lazy" for performance */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
