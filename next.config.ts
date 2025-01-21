import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'], // Add the hostname here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // Skip TypeScript errors during build
  },
};
export const runtime = 'nodejs';
export default nextConfig;
