import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Set basePath/assetPrefix for GitHub Project Pages when provided via env.
// Example: NEXT_PUBLIC_BASE_PATH=/MyWebSite
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  output: "export",
  images: {
    // Keep images static for export
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
  // Apply basePath/assetPrefix only when provided
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

// Keep production builds from overwriting assets used by a running dev server.
export default (phase) => ({
  ...nextConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
