/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Permite cualquier origen en modo desarrollo
    allowedDevOrigins: ['*']
  }
}

module.exports = nextConfig;
