import 'server-only'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { CACHE_10M, CACHE_1D } from 'lib/fetchAPI'
import { getGroup } from 'lib/server-only-context/cache'

/** そこまで注目されない部分なので強気にキャッシュする */
const LIVE_CACHE_TTL = CACHE_10M
/** 終了したStreamなので強気にキャッシュする */
const ENDED_CACHE_TTL = CACHE_1D

type Base = {
  id: string
  title: string
  channel: string
  thumbnail?: string
}

type LiveRelatedVideo = Base & {
  status: 'live'
  concurrentViewers: number
}

type EndedRelatedVideo = Base & {
  status: 'ended'
  views: number
}

type RelatedVideo = LiveRelatedVideo | EndedRelatedVideo

export const getRelatedVideos = async (args: {
  channelId: string
}): Promise<RelatedVideo[]> => {
  const [live, ended] = await Promise.all([
    getStreams({
      status: 'live',
      group: getGroup(),
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: 8,
      revalidate: LIVE_CACHE_TTL
    }),
    getStreams({
      status: 'ended',
      channelId: args.channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: 7,
      revalidate: ENDED_CACHE_TTL
    })
  ])

  const streams = live.concat(ended)
  const [channels, liveStreamingDetailsList, statisticsList] =
    await Promise.all([
      getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
      getLiveStreamingDetails({
        videoIds: live.map(stream => stream.videoId),
        revalidate: LIVE_CACHE_TTL
      }),
      getStatistics({
        videoIds: ended.map(stream => stream.videoId),
        revalidate: ENDED_CACHE_TTL
      })
    ])

  const liveRelatedVideos: LiveRelatedVideo[] = live
    .map(stream => {
      const channel = channels.find(
        channel => channel.basicInfo.id === stream.snippet.channelId
      )
      if (!channel) return null

      const video = liveStreamingDetailsList.find(
        details => details.id === stream.videoId
      )
      if (!video) return null

      return {
        id: stream.videoId,
        status: 'live' as const,
        title: stream.snippet.title,
        channel: channel.basicInfo.title,
        thumbnail: stream.snippet.thumbnails['medium']?.url,
        // For Live Streams.
        concurrentViewers: video.liveStreamingDetails?.concurrentViewers ?? 0
      }
    })
    .filter(e => e !== null)

  const endedRelatedVideos: EndedRelatedVideo[] = ended
    .map(stream => {
      const channel = channels.find(
        channel => channel.basicInfo.id === stream.snippet.channelId
      )
      if (!channel) return null

      const video = statisticsList.find(stats => stats.id === stream.videoId)
      if (!video) return null

      return {
        id: stream.videoId,
        status: 'ended' as const,
        title: stream.snippet.title,
        channel: channel.basicInfo.title,
        thumbnail: stream.snippet.thumbnails['medium']?.url,
        // For Ended Streams.
        views: video.statistics.viewCount ?? 0
      }
    })
    .filter(e => e !== null)

  return [...liveRelatedVideos, ...endedRelatedVideos]
}
