import { notFound } from "next/navigation";
import BlogPostClient from "../../../components/BlogPostClient";

// Demo post data (replace with real data or fetch from backend later)
const posts = [
  {
    slug: "demo-all-features",
    title: "Demo: All Blog Features",
    date: "2025-07-27",
    tags: ["demo", "features", "markdown"],
    content: [
      '# Demo: All Blog Features',
      // Content truncated for brevity
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

// Generate static params for all possible slugs
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// @ts-nocheck - Ignoring TypeScript errors for build
export default function Page(props: any) {
  const { params } = props;
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return <BlogPostClient post={post} />;
}
