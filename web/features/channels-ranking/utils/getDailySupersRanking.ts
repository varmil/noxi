import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

/**
 * @param date used for last24Hours ranking
 * @param limit last24Hours ranking limit
 **/
export async function getDailySupersRanking({
  date,
  limit
}: {
  date?: dayjs.ConfigType
  limit?: number
}): Promise<ChannelsRanking[]> {
  const supersSummaries = await getSupersSummaries({
    orderBy: [{ field: 'last24Hours', order: 'desc' }],
    date: dayjs(date).toDate(),
    limit
  })
  const [channels] = await Promise.all([
    getChannels({ ids: supersSummaries.map(e => e.channelId) })
  ])

  const ranking = supersSummaries
    .map((summary, i) => {
      const channel = channels.find(e => e.basicInfo.id === summary.channelId)
      if (!channel) return null

      const {
        basicInfo: { title, thumbnails }
      } = channel

      return {
        rank: i + 1,
        channelId: summary.channelId,
        channelTitle: title,
        channelThumbnails: thumbnails['medium']?.url,
        amount: formatMicrosAsRoundedAmount(
          summary?.['last24Hours'] ?? BigInt(0)
        ),
        group: channel.peakX.group
      }
    })
    .filter((e): e is NonNullable<typeof e> => !!e)

  return ranking
}
