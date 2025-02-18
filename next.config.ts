import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["babytilly.s3.amazonaws.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "babytilly.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
