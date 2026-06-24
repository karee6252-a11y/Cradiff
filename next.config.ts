import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Serve modern, smaller formats where the browser supports them.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Tree-shake heavy UI libraries down to only the icons/utilities used,
  // shrinking the client bundle and improving load performance.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
