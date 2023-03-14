/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseApiUrl: process.env.API_URL
  }
}

module.exports = nextConfig
