/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5040",
        pathname: "/posts/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn0.gstatic.com",
//         pathname: "/images/**",
//       },
//       {
//         protocol: "https",
//         hostname: "blog-app-nextjs-production.up.railway.app",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "blog-appnextjs.vercel.app", // ✅ no https:// here
//         pathname: "/**",
//       },
//     ],
//   },
// };
