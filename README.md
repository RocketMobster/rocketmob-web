# RocketMobster Software Public Website

This is the official public website for RocketMobster Software, built with Next.js, TypeScript, and Tailwind CSS.

## Features (per PRD)
- Homepage with hero banner
- Apps showcase grid
- Individual app pages
- AI art gallery
- Blog/news section
- About and contact pages
- Admin backend (future)

See `Product Requirements Document (PRD).md` for full details.

## Project Structure

```
rocketmob-web/
├── .github/            # GitHub Actions workflows
├── public/             # Static assets
├── scripts/            # Build scripts
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # Reusable UI components
│   └── styles/         # Global styles
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── server.js           # Custom development server
└── tailwind.config.js  # Tailwind CSS configuration
```

## Development Guidelines

- Mobile-first approach
- Animated and interactive elements
- Fun and nerdy design aesthetic
- Following the product requirements document (PRD)

## GitHub Pages Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions. For detailed information about the deployment process, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
