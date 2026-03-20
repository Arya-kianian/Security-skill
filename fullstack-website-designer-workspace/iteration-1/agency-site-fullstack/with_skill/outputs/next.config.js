/** @type {import('next').NextConfig} */
const nextConfig = {
  // Three.js uses ESM — transpile to avoid module resolution errors
  transpilePackages: ['three'],

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // Webpack: treat Three.js addons as client-only, exclude from server bundle
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [...(config.externals || []), 'three'];
    }
    return config;
  },
};

module.exports = nextConfig;
