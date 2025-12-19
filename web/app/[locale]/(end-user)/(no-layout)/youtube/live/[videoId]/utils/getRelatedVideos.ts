import 'server-only'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { CACHE_1D } from 'lib/fetchAPI'

/** 終了したStreamなので強気にキャッシュする */
const ENDED_CACHE_TTL = CACHE_1D

export const getRelatedVideos = async (args: {
  type: 'live' | 'ended'
  channelId: string
}): Promise<StreamsSchema> => {
  const { type, channelId } = args
  let streams: StreamsSchema = []

  if (type === 'live') {
    streams = await getStreams({
      status: 'live',
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: 12
    })
  }
  if (type === 'ended') {
    streams = await getStreams({
      status: 'ended',
      channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: 15,
      revalidate: ENDED_CACHE_TTL
    })
  }

  return streams
}
