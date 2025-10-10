// Set basePath/assetPrefix for GitHub Project Pages when provided via env.
// Example: NEXT_PUBLIC_BASE_PATH=/MyWebSite
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

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

export default nextConfig;

