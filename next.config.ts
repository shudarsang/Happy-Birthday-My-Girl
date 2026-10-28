import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root (a stray lockfile higher up can confuse detection).
  turbopack: { root: __dirname },
};

export default nextConfig;
