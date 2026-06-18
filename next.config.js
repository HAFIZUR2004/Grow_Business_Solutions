/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable cache components to allow dynamic routes in admin section
  // Note: Next.js 14 এ 'cacheComponents' অফিশিয়াল প্রপার্টি নয়, তবে এটি টাইপ সেফ রাখার জন্য এভাবেই রাখা হলো
  cacheComponents: false,
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

module.exports = nextConfig;