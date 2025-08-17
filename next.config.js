/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Asset prefix needs to start with slash for Next.js fonts
  assetPrefix: "/",
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
