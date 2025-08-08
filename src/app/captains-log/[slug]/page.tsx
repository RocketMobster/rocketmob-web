"use client";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

// Demo post data (replace with real data or fetch from backend later)
const posts = [
  {
    slug: "demo-all-features",
    title: "Demo: All Blog Features",
    date: "2025-07-27",
    tags: ["demo", "features", "markdown"],
    content: [
      '# Demo: All Blog Features',
      '',
      'Welcome to a demonstration of all supported blog features!',
      '',
      '## Headings',
      '',
      '# H1 Heading',
      '## H2 Heading',
      '### H3 Heading',
      '',
      '## Text Styling',
      '',
      '**Bold text**',
      '*Italic text*',
      '',
      '<span style="color: #e11d48;">Red text using HTML</span>',
      '',
      '## Code Block',
      '',
      '```js',
      '// JavaScript code example',
      'function greet(name) {',
      '  return `Hello, ${name}!`;',
      '}',
      '```',
      '',
      '## Quote Block',
      '',
      '> This is a quote block.',
      '',
      '## Links',
      '',
      '[Visit RocketMobster](https://rocketmobster.com)',
      '',
      '## Images',
      '',
      // Local image placeholder (gray box with text)
      '<a href="https://rocketmobster.com/gallery" target="_blank" rel="noopener noreferrer"><span style="display:inline-block;width:120px;height:80px;background:#e5e7eb;color:#6b7280;line-height:80px;text-align:center;border-radius:8px;font-size:14px;font-family:monospace;">Local Image</span></a>',
      '',
      // Actual gallery image (replace with a real image path from your gallery)
      '[![Gallery Image](/gallery/ai-art-1.jpg)](https://rocketmobster.com/gallery/ai-art-1)',
      '',
      'You can click the images above to visit their respective pages.',
      '',
      '---',
      '',
      'Enjoy writing posts with all these features!'
    ].join('\n'),
  },
  {
    slug: "welcome-to-the-captains-log",
    title: "Welcome to The Captain&apos;s Log!",
    date: "2025-07-26",
    tags: ["intro", "news"],
    content: `# Welcome!\nThis is the first entry in The Captain&apos;s Log. Stay tuned for devlogs, news, and more!`,
  },
  {
    slug: "ai-art-gallery-behind-the-scenes",
    title: "AI Art Gallery: Behind the Scenes",
    date: "2025-07-20",
    tags: ["gallery", "ai", "devlog"],
    content: `## How we built the AI Art Gallery\nA peek into the tech and design behind the scenes.`,
  },
];

import React from "react";
import type { Components } from "react-markdown";

export default function CaptainsLogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

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
