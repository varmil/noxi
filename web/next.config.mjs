// @ts-check
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./config/i18n/request.ts')

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
  // async headers() {
  //   return CacheHeaders
  // },
  // logging: {
  //   fetches: {
  //     fullUrl: true
  //   }
  // }
}

export default withNextIntl(nextConfig)
