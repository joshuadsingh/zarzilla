/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.tvmaze.com', 'unsplash.com', 'images.unsplash.com', 'www.business2community.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
