import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirect all API calls
        destination: "http://api.cvgenius.stepdevs.click:8000/api/:path*", // Your actual backend
      },
    ];
  },
  ignoreBuildErrors: true,
};

export default nextConfig;
