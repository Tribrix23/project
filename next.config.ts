import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL || '';
const r2Hostname = r2PublicUrl ? new URL(r2PublicUrl).hostname : '';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.100.51'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '192.168.100.51',
      },
      ...(r2Hostname ? [{
        protocol: 'https' as const,
        hostname: r2Hostname,
      }] : []),
    ],
  },
};

export default nextConfig;
