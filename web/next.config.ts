import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./config/i18n/request.ts')

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2025/02/02 Super Chat --> Earnings (/live/:id/super-chat)
      {
        source: '/:locale/youtube/live/:id/super-chat',
        destination: '/:locale/youtube/live/:id/earnings',
        permanent: true
      },
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

export default withNextIntl(nextConfig)
