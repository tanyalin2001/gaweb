/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ytimg.com", "api.gatcg.com", "omni.gatcg.com"],
  },
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ["image/webp"],
  minimumCacheTTL: 3600,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = nextConfig;
