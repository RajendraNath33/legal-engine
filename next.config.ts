import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["vidhi-mitra.shilpshakti.org.in"],
};

export default nextConfig;