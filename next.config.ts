import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here  */
 images: {
    domains: ['nestflix.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
