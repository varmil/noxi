import { getSupersSnapshotRanking } from 'apis/supers-snapshots/getRanking'
import { getChannels } from 'apis/youtube/getChannels'

import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import { Gender } from 'types/gender'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

/**
 * 週間・月間スナップショットランキングを取得
 */
export async function getSnapshotSupersRanking({
  period,
  target,
  group,
  gender,
  limit
}: {
  period: 'weekly' | 'monthly'
  target: string // YYYY-Wxx or YYYY-MM
  group: string
  gender?: Gender
  limit?: number
}): Promise<ChannelsRanking[]> {
  const snapshots = await getSupersSnapshotRanking({
    period,
    target,
    group,
    gender,
    limit
  })

  const [channels] = await Promise.all([
    getChannels({ ids: snapshots.map(e => e.channelId) })
  ])

  const ranking = snapshots
    .map((snapshot, i) => {
      const channel = channels.find(e => e.basicInfo.id === snapshot.channelId)
      if (!channel) return null

      const {
        basicInfo: { title, thumbnails }
      } = channel

      return {
        rank: i + 1,
        channelId: snapshot.channelId,
        channelTitle: title,
        channelThumbnails: thumbnails['medium']?.url,
        amount: formatMicrosAsRoundedAmount(snapshot.amountMicros),
        group: channel.peakX.group
      }
    })
    .filter((e): e is NonNullable<typeof e> => !!e)

  return ranking
}
