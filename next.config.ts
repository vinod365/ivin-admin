import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "i.ibb.co",
      },
      {
        hostname: "kyssjpbhetgkytjwndzd.supabase.co",
      },
    ],
  },
  // output: "standalone",
  // outputFileTracingExcludes: {
  //   "**": [
  //      './node_modules/@vercel/og/**',
  //       './node_modules/satori/**',
  //       './node_modules/next/dist/compiled/@vercel/og/**',
  //       './node_modules/next/dist/compiled/satori/**',
  //   ],
  // },
};

export default nextConfig;
