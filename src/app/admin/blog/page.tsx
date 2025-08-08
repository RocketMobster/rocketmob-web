// Admin UI for managing blog posts
// TODO: Connect to API, implement add/edit/delete, and post scheduling
"use client";
import { useState } from "react";

export default function AdminBlogPage() {
  // TODO: Fetch posts from API
  const [posts, setPosts] = useState([]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin: Blog Management</h1>
      {/* TODO: Add form for creating/editing posts */}
      {/* TODO: Add list of posts with edit/delete buttons */}
      {/* TODO: Add post scheduling UI (date/time picker, status) */}
      <div className="text-gray-500">Blog admin features coming soon.</div>
    </main>
  );
}
