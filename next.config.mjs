/** @type {import('next').NextConfig} */
const nextConfig = {
  // devServer.fastRefresh = true,
  reactStrictMode: false,
  experimental: {
    nextScriptWorkers: true,
  },
};

export default nextConfig;
