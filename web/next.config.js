// @ts-check
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./config/i18n/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=0, s-maxage=3600'
          }
        ]
      },
      /**
       * exclude paths which may include query params
       */
      {
        source: '/:locale/youtube/charts/:path*',
        has: [
          {
            type: 'query',
            key: '_rsc'
          }
        ],
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: ''
          }
        ]
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
