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

// Generate static params for all possible slugs
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Type for page props in Next.js 15.4.6
type PageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({ params }: PageProps) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return <BlogPostClient post={post} />;
}
