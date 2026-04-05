import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "nheppvjayzxlblkeanxs.supabase.co" },
      { protocol: "https", hostname: "capvisionpartner.com" },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3001", "admin.capvisionpartner.com"] },
  },
};

export default nextConfig;
