const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons8-news-doodle-16.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons8-news-doodle-32.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons8-news-doodle-96.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://quick-news-tau.vercel.app/api/:path*',
      },
    ]
  },
  webpack: (originalConfig, { isServer }) => {
    const config = { ...originalConfig }

    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'core-js/modules': 'core-js-pure/stable',
        },
      }
      config.target = 'web'
    }

    return config
  },
  experimental: {
    optimizeCss: false,
    nextScriptWorkers: true,
  },
  images: {
    domains: ['png.pngtree.com'],
    minimumCacheTTL: 60,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
