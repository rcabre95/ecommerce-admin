/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**'
      },
      {
        protocol: 'https',
        hostname: 'raphael-nextjs-ecommerce.s3.amazonaws.com',
        port: '',
        pathname: '/**'
      },
    ]
  }
}

module.exports = nextConfig
