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
            key: 'Cache-Control',
            value: 'max-age=600, s-maxage=3600'
          }
        ]
      }
    ]
  }
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'yt3.ggpht.com'
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'i.ytimg.com'
  //     }
  //   ]
  // }
}

module.exports = withNextIntl(nextConfig)
