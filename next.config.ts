import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  eslint: {
    // Allow production builds to succeed even with ESLint warnings
    // ESLint is still run separately via `npm run lint`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore TS errors from generated Prisma client during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
