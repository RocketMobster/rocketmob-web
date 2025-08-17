"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import React from "react";
import type { Components } from "react-markdown";

interface BlogPostClientProps {
  post: {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    content: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Custom renderer for code blocks with label and styling
  const components: Components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: (props: any) => {
      // 'inline' is not always present, so check safely
      const { inline, className, children } = props;
      if (inline) {
        return <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-pink-600 dark:text-pink-300 text-sm font-mono">{children}</code>;
      }
      return (
        <div className="mb-4">
          <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-t border-b border-gray-700 w-fit">Code:</div>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-pink-400 dark:border-pink-600 rounded-b rounded-t-none p-4 overflow-x-auto text-sm font-mono">
            <code className={className}>{children}</code>
          </pre>
        </div>
      );
    },
    img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
      let src = props.src;
      const alt = props.alt;
      // Ensure src is always a string for Next.js Image
      if (typeof src !== "string") src = "";
      // Use next/image for gallery images, fallback to <img> for others
      if (src.startsWith("/gallery/")) {
        return (
          <Image src={src} alt={alt || "Gallery Image"} width={320} height={200} className="rounded shadow border border-gray-300 dark:border-gray-700" loading="lazy" />
        );
      }
      return <Image src={src} alt={alt || "Blog image"} width={320} height={200} className="rounded shadow border border-gray-200 dark:border-gray-700" loading="lazy" />;
    },
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/captains-log" className="text-blue-600 dark:text-yellow-400 hover:underline text-sm mb-4 inline-block">← Back to The Captain&apos;s Log</Link>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-2xl sm:text-3xl font-bold mb-2 text-gradient bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent drop-shadow"
      >
        {post.title.replace("'", "&apos;")}
      </motion.h1>
      <div className="text-sm text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-100 px-2 py-0.5 rounded text-xs font-medium">
            #{tag}
          </span>
        ))}
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {post.content.replace(/'/g, "&apos;")}
        </ReactMarkdown>
      </article>
    </main>
  );
}
