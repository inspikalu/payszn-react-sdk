import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
    };

    return config;
  },
  // Add transpilation for problematic packages
  transpilePackages: [
    "@metaplex-foundation/umi-eddsa-web3js",
    "@soceanfi/solana-cli-config",
    "@walletconnect/sign-client",
    "@jnwng/walletconnect-solana"
  ],
  // Set any environment variables if needed
  env: {
    // Your environment variables here if needed
  },
  // Other common Next.js settings
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
};

export default nextConfig;