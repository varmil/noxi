import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { GroupString } from 'config/constants/Group'
import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { Gender } from 'types/gender'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

/**
 * @param date used for last24Hours ranking
 **/
export async function getDailySupersRanking({
  group,
  gender,
  date,
  limit
}: {
  group?: GroupString
  gender?: Gender
  date?: dayjs.ConfigType
  limit?: number
}): Promise<ChannelsRanking[]> {
  const supersSummaries = await getSupersSummaries({
    group,
    gender,
    date: dayjs(date).toDate(),
    orderBy: [{ field: 'last24Hours', order: 'desc' }],
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
