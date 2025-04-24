import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

/** Last 50 Streams pagination */
export const PAGE_SIZE = 30

/**
 * 直近X件 (終了したStream) && avgConcurrentViewers > 0
 * 古いデータは結構avgConcurrentViewersが抜けてるので、filterしておく
 */
export const getLast30Streams = async ({
  channelId,
  page
}: {
  channelId: string
  page?: number
}): Promise<StreamsSchema> => {
  const streams = await getStreams({
    status: 'ended',
    channelId,
    avgConcurrentViewers: { gte: 1 },
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: PAGE_SIZE,
    offset: page ? (page - 1) * PAGE_SIZE : 0
  })

  return streams
}
