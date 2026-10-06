import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
