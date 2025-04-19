import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dennishorton.co.uk",
      },
      {
        protocol: "https",
        hostname: "carvia-public.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.bipicar.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.carlogos.org",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
