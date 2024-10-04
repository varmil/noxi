import { getStreams } from 'apis/youtube/getStreams'

/**
 * チャートに利用
 * 古いデータは結構avgConcurrentViewersが抜けてるので、filterしておく
 */
export const getStreamsForStatsChart = async ({
  channelId
}: {
  channelId: string
}) => {
  const streams = (
    await getStreams({
      status: 'ended',
      channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: 50
    })
  ).filter(stream => stream.metrics.avgConcurrentViewers > 0)

  return streams
}
