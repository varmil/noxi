// @ts-check
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./config/i18n/i18n.ts')

/**
 * exclude paths which may include query params
 */
const noCacheSources = ['/:locale/hololive', '/:locale/youtube/charts/:path*']
const noCacheHeaders = noCacheSources.map(source => ({
  source,
  has: [{ type: 'query', key: '_rsc' }],
  headers: [{ key: 'CDN-Cache-Control', value: '' }]
}))

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=10800, s-maxage=10800'
          }
        ]
      }
    ].concat(noCacheHeaders)
  }
}

module.exports = withNextIntl(nextConfig)
