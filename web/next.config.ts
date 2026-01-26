import path from 'path'
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin({
  requestConfig: './config/i18n/request.ts'
})

const nextConfig: NextConfig = {
  // Vercel monorepo 用の設定（ローカルでは不要）
  ...(process.env.VERCEL && { outputFileTracingRoot: '/vercel/path0' }),
  // モノレポのルートディレクトリを指定（絶対パス）
  turbopack: {
    root: path.resolve(__dirname, '..')
  },
  async headers() {
    return [
      // グループロゴ画像の長期キャッシュ（1年間）
      // ロゴはほとんど変わらないので、ブラウザキャッシュで完結させる
      {
        source: '/group/:groupId/logo.:ext(png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
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
      // iOS レガシーアイコン → 標準アイコンへリダイレクト
      {
        source: '/apple-touch-icon-precomposed.png',
        destination: '/apple-touch-icon.png',
        permanent: true
      },
      // 2025/01/22: Modify period 'wholePeriod' to 'thisYear' for live ranking
      {
        source: '/:locale/ranking/:dimension/live/:group/wholePeriod',
        destination: '/:locale/ranking/:dimension/live/:group/thisYear',
        permanent: true
      },
      // 2025/01/25: Redirect last1Year to thisYear for live ranking
      {
        source: '/:locale/ranking/:dimension/live/:group/last1Year',
        destination: '/:locale/ranking/:dimension/live/:group/thisYear',
        permanent: true
      },
      // 2025/06/12: Modify period 'all' to 'wholePeriod'
      {
        source: '/:locale/ranking/:dimension/live/:group/all',
        destination: '/:locale/ranking/:dimension/live/:group/thisYear',
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
      }
    ]
  }
}

export default withNextIntl(nextConfig)
