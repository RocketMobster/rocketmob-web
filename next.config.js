/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Use basePath for GitHub Pages
  basePath: '/rocketmob-web',
  // Asset prefix needs to start with slash for Next.js fonts
  assetPrefix: "/rocketmob-web",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
