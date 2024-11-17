import BigNumber from 'bignumber.js'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { SupersRanking } from 'features/supers-ranking/types/SupersRanking.type'
import dayjs from 'lib/dayjs'

/**
 * @param date used for daily ranking
 * @param limit daily ranking limit
 **/
export async function getDailySupersRanking({
  date,
  limit
}: {
  date?: dayjs.ConfigType
  limit?: number
}): Promise<SupersRanking[]> {
  const supersBudles = await getSupersBundles({
    actualEndTimeGTE: getActualEndTimeGTE(date),
    actualEndTimeLTE: getActualEndTimeLTE(date),
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit
  })
  const [channels, streams] = await Promise.all([
    getChannels({ ids: supersBudles.map(e => e.channelId) }),
    getStreams({ videoIds: supersBudles.map(e => e.videoId), limit })
  ])

  const ranking = supersBudles
    .map((bundle, i) => {
      const channel = channels.find(e => e.basicInfo.id === bundle.channelId)
      const stream = streams.find(e => e.videoId === bundle.videoId)
      if (!channel || !stream) return null

      const {
        basicInfo: { title, thumbnails }
      } = channel
      const {
        snippet: { title: streamTitle }
      } = stream

      return {
        rank: i + 1,
        channelId: bundle.channelId,
        channelTitle: title,
        channelThumbnails: thumbnails['medium']?.url,
        streamTitle: streamTitle,
        amount: Math.round(
          BigNumber(bundle.amountMicros.toString()).div(1_000_000).toNumber()
        ).toLocaleString(),
        group: bundle.group
      }
    })
    .filter((e): e is NonNullable<typeof e> => !!e)

  return ranking
}

export const getActualEndTimeGTE = (date: dayjs.ConfigType) =>
  dayjs(date).subtract(1, 'day').toDate()

export const getActualEndTimeLTE = (date: dayjs.ConfigType) =>
  dayjs(date).toDate()
