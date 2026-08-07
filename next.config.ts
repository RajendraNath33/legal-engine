import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["vidhi-mitra.shilpshakti.org.in"],
};

export default nextConfig;