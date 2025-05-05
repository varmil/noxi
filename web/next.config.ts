import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./config/i18n/request.ts')

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
