import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

/** Last 50 Streams pagination */
export const PAGE_SIZE = 50

/**
 * 直近50件 (終了したStream) && avgConcurrentViewers > 0
 * 古いデータは結構avgConcurrentViewersが抜けてるので、filterしておく
 */
export const getLast50Streams = async ({
  channelId,
  page
}: {
  channelId: string
  page?: number
}): Promise<StreamsSchema> => {
  const streams = (
    await getStreams({
      status: 'ended',
      channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: PAGE_SIZE,
      offset: page ? (page - 1) * PAGE_SIZE : 0
    })
  ).filter(stream => stream.metrics.avgConcurrentViewers > 0)

  return streams
}
