import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "**.postimg.cc" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
  },
  output: 'standalone',
  // Optimize compression and source maps
  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;