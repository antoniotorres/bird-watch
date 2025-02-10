import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
        port: "",
        pathname: "/github/stars/antoniotorres/bird-watch.svg",
        search: "",
      },
    ],
  },
};

export default nextConfig;
