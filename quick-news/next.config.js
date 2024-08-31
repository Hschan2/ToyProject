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
          {
            key: 'Cache-Control',
            value: 'max-age=3600, public',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=3600, public',
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js/modules': 'core-js-pure/stable',
      };
      config.target = 'web';
    }
    return config;
  },
  experimental: {
    optimizeCss: false,
    nextScriptWorkers: true,
  },
  image: {
    domain: ['png.pngtree.com'],
  },
  babel: {
    presets: [
      [
        'next/babel',
        {
          targets: {
            esmodules: true,
            browsers: ['>1%', 'last 2 versions', 'not dead', 'not ie 11'], // 브라우저 타겟 설정
          },
        },
      ],
    ],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)