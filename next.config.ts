import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/HBW',
  assetPrefix: '/HBW/',
};

export default nextConfig;

