import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // GitHub Pages doesn't support Next Image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
