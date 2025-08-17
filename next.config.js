/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // No basePath - this causes more problems than it solves
  // No assetPrefix - let GitHub Pages handle the paths
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
