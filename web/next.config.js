// @ts-check
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./config/i18n/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
