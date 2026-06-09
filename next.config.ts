import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Important for MongoDB compatibility
  serverExternalPackages: ['mongoose', 'mongodb'],
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'mongodb'],
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
      { protocol: "https", hostname: "**" }, // Allow all for production
    ],
  },
  output: 'standalone',
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Webpack configuration for MongoDB
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'mongoose', 'mongodb'];
    }
    return config;
  },
};

export default nextConfig;