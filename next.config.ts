import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'], // Add the hostname here
  },
};
export const runtime = 'nodejs';
export default nextConfig;
