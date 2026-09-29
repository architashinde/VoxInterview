import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore", "google-gax", "@grpc/grpc-js"],
};

export default nextConfig;
