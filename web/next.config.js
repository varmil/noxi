// @ts-check
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./config/i18n/i18n.ts')

/**
 * exclude paths which may include query params
 */
// const cacheSources = [
//   '/:locale',
//   '/:locale/terms-of-use-and-privacy-policy',
//   '/:locale/:path*/charts/chanels',
//   '/:locale/:path*/chanels/:channelId'
// ]
// const CacheHeaders = cacheSources.map(source => ({
//   source,
//   headers: [
//     {
//       key: 'CDN-Cache-Control',
//       value: 'public, max-age=10800, s-maxage=10800'
//     }
//   ]
// }))

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 2024/11/30 Super Chat ランキングを移動
      {
        source: '/:locale/youtube/super-chat/ranking',
        destination: '/:locale/youtube/channels/ranking',
        permanent: true
      },
      // 2024/11/30：Youtube Live ランキングを移動
      {
        source: '/:locale/youtube/ranking/live',
        destination: '/:locale/youtube/live/ranking',
        permanent: true
      },
      // 2024/11/21：Youtube Live ランキングを移動
      {
        source: '/:locale/youtube/live',
        destination: '/:locale/youtube/ranking/live',
        permanent: true
      },
      // 2024/11/11：LiaqN【りあん】 を independent-irl に移動
      {
        source: '/:locale/independent/channels/UCdVnOfmhI0sNGdaH5yldztg',
        destination:
          '/:locale/independent-irl/channels/UCdVnOfmhI0sNGdaH5yldztg',
        permanent: true
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
