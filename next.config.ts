import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  typescript: {
    // Also ignore TS errors from generated Prisma client during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
