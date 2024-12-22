import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

/**
 * 直近50件 (終了したStream) && avgConcurrentViewers > 0
 * 古いデータは結構avgConcurrentViewersが抜けてるので、filterしておく
 */
export const getLast50Streams = async ({
  channelId
}: {
  channelId: string
}): Promise<StreamsSchema> => {
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
