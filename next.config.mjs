/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // First-draft preview: don't let lint warnings block the build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
