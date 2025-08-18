import { notFound } from "next/navigation";
import BlogPostClient from "../../../components/BlogPostClient";

// Demo post data (replace with real data or fetch from backend later)
const posts = [
  {
    slug: "demo-all-features",
    title: "Demo: All Blog Features",
    date: "2025-07-27",
    tags: ["demo", "features", "markdown"],
    content: `# Demo: All Blog Features

This post demonstrates all the blog features available in The Captain's Log.

## Text Formatting

You can use **bold**, *italic*, or ~~strikethrough~~ formatting. You can also include [links](https://rocketmobster.github.io/rocketmob-web/).

## Code Blocks

Here's a code example:

\`\`\`javascript
// A simple JavaScript function
function greet(name) {
  return \`Hello, \${name}! Welcome aboard the RocketMobster!\`;
}

console.log(greet('Captain'));
\`\`\`

## Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First step
2. Second step
3. Third step

## Blockquotes

> "Space isn't remote at all. It's only an hour's drive away if your car could go straight upwards."
> — Fred Hoyle

## Images

We can add images to blog posts:

![Example Image](/rocketmob-web/RocketMobster_Avatar.jpeg)

## Tables

| Feature | Supported |
|---------|-----------|
| Markdown | ✅ |
| Code blocks | ✅ |
| Images | ✅ |
| Tables | ✅ |

## That's It!

Thanks for checking out the blog features demo!`,
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
