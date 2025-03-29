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
        hostname: "blog-app-nextjs-production.up.railway.app",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
