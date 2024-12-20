import { getStreams } from 'apis/youtube/getStreams'

/**
 * 直近50本
 * 古いデータは結構avgConcurrentViewersが抜けてるので、filterしておく
 */
export const getRecentEndedStreams = async ({
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
