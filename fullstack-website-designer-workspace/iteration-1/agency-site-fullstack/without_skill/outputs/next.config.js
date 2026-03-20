/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: false,
  },
  // Allow GSAP and other client-side heavy libraries
  transpilePackages: ['gsap'],
};

module.exports = nextConfig;
