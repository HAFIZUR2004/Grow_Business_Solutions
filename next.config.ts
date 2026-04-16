import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // আপনার জন্য আরও কিছু কমন হোস্টনেম (optional)
      {
        protocol: "https",
        hostname: "**.postimg.cc", // সব সাবডোমেইনের জন্য
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com", // Cloudinary ইমেজ হোস্টিং
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
