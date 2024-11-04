import type { LiveStreamingDetailsListSchema } from 'apis/youtube/data-api/schema/liveStreamingDetailsSchema'
import type { StreamsSchema } from 'apis/youtube/schema/streamSchema'

export const getSortedStreams = (
  streams: StreamsSchema,
  liveStreamingDetailsList: LiveStreamingDetailsListSchema
) =>
  streams.sort((a, b) => {
    const { liveStreamingDetails: aDetails } =
      liveStreamingDetailsList.find(videos => videos.id === a.videoId) || {}
    const { liveStreamingDetails: bDetails } =
      liveStreamingDetailsList.find(videos => videos.id === b.videoId) || {}

    if (!aDetails?.concurrentViewers) return 1
    if (!bDetails?.concurrentViewers) return -1

    if (aDetails.concurrentViewers < bDetails.concurrentViewers) return 1
    if (aDetails.concurrentViewers > bDetails.concurrentViewers) return -1
    return 0
  })
