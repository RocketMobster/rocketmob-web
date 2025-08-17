/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // No basePath or assetPrefix - we'll physically organize the files instead
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
