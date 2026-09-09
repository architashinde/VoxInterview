import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    "firebase-admin",
    "jwks-rsa",
    "jose",
    "google-auth-library",
  ],
};

export default nextConfig;
