import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { LiveStreamingDetailsListSchema } from 'apis/youtube/schema/data-api/liveStreamingDetailsSchema'
import { StatisticsListSchema } from 'apis/youtube/schema/data-api/statisticsSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

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

export const useRelatedVideos = (args: {
  liveStreams: StreamsSchema
  endedStreams: StreamsSchema
  channels: ChannelsSchema
  /** For Live Streams */
  liveStreamingDetailsList: LiveStreamingDetailsListSchema
  /** For Ended Streams */
  statisticsList: StatisticsListSchema
}): RelatedVideo[] => {
  const {
    liveStreams,
    endedStreams,
    channels,
    liveStreamingDetailsList,
    statisticsList
  } = args
  const liveRelatedVideos: LiveRelatedVideo[] = liveStreams
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

  const endedRelatedVideos: EndedRelatedVideo[] = endedStreams
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
