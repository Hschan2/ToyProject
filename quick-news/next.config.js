/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
