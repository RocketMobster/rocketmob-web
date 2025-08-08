import type { NextConfig } from "next";

const repoName = "rocketmob-web";
const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: `/${repoName}/`,
  basePath: `/${repoName}`,
};

export default nextConfig;
