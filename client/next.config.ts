import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/images/**", // Adjust if needed
      },

      {
        protocol: "https",
        hostname: "blog-appnextjs.vercel.app",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5040', // Or whatever port you are using
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
