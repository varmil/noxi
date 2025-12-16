import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin({
  requestConfig: './config/i18n/request.ts'
})

const nextConfig: NextConfig = {
  outputFileTracingRoot: '/vercel/path0',
  async headers() {
    return [
      // workaround: browser --> PWA google auth causes error
      // https://intercom.help/progressier/en/articles/9519381-google-oauth2-is-not-working-in-my-pwa-on-ios-why
      // https://stackoverflow.com/questions/62127764/google-oauth2-invalid-token-format-error-on-redirecting-to-pwa
      {
        source: '/api/auth/callback/google',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, immutable'
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      // 2025/06/12: Modify period 'all' to 'wholePeriod'
      {
        source: '/:locale/ranking/:dimension/live/:group/all',
        destination: '/:locale/ranking/:dimension/live/:group/wholePeriod',
        permanent: true
      },
      {
        source: '/:locale/ranking/:dimension/channels/:group/all',
        destination: '/:locale/ranking/:dimension/channels/:group/wholePeriod',
        permanent: true
      },
      {
        source: '/:locale/ranking/most-cheered/:group/all',
        destination: '/:locale/ranking/most-cheered/:group/wholePeriod',
        permanent: true
      },
      {
        source: '/:locale/ranking/top-fans/:group/all',
        destination: '/:locale/ranking/top-fans/:group/wholePeriod',
        permanent: true
      },
      // 2025/06/12: Fix Live Ranking wrong pagination
      {
        source: '/:locale/ranking/super-chat/live/:group/:period&page=:page',
        destination:
          '/:locale/ranking/super-chat/live/:group/:period?page=:page',
        permanent: true
      },
      {
        source: '/:locale/ranking/super-chat/live/:group/:period',
        has: [{ type: 'query', key: 'page', value: 'page=(?<page>\\d+)' }],
        destination:
          '/:locale/ranking/super-chat/live/:group/:period?page=:page',
        permanent: true
      },
      // 2025/05/08 Terms of Use and Privacy Policy を移動
      {
        source: '/:locale/youtube/terms-of-use-and-privacy-policy',
        destination: '/:locale/terms-of-use-and-privacy-policy',
        permanent: true
      },
      // 2025/05/05 Channels ランキングを移動
      {
        source: '/:locale/youtube/channels/ranking',
        destination: '/:locale/ranking/channels',
        permanent: true
      },
      // 2025/05/05 Live ランキングを移動
      {
        source: '/:locale/youtube/live/ranking',
        destination: '/:locale/ranking/live',
        permanent: true
      },
      // 2025/04/12：神楽すず を dotlive に移動
      {
        source: '/:locale/independent/channels/UCUZ5AlC3rTlM-rA2cj5RP6w',
        destination: '/:locale/dotlive/channels/UCUZ5AlC3rTlM-rA2cj5RP6w',
        permanent: true
      },
      // 2025/04/03 Delete Related Videos
      {
        source: '/:locale/youtube/live/:id/related-videos',
        destination: '/:locale/youtube/live/:id',
        permanent: true
      },
      // 2025/02/02 Super Chat --> Earnings (/live/:id/super-chat)
      {
        source: '/:locale/youtube/live/:id/super-chat',
        destination: '/:locale/youtube/live/:id/earnings',
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

export default withNextIntl(nextConfig)
