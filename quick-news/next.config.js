/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  async headers() {
    return [
      {
        source: '/api/news',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://quick-news-hschan2.vercel.app/api/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://quick-news-tau.vercel.app/api/:path*',
      },
      {
        source: '/api/:path*',
        destination:
          'https://quick-news-git-master-hschan2.vercel.app/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
