import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ccfc-gall.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.contentful.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      }
    ],
  },
};

export default nextConfig;
