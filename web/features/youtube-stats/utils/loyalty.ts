import { ChannelSchema } from 'api-schema/youtube/channelSchema'
import { normalize } from 'lib/normalization'

// NOX
// const LOYALTY_RANGE = [0.13, 0.79]
// Me
const LOYALTY_RANGE = [0.02, 3.0]

export const getLoyalty = ({
  viewCount,
  subscriberCount,
  videoCount
}: ChannelSchema['statistics']) => {
  if (!viewCount || !videoCount) return 0

  const ViewPerVideo = viewCount / videoCount

  const scaled = normalize(subscriberCount / ViewPerVideo, {
    min: LOYALTY_RANGE[0],
    max: LOYALTY_RANGE[1]
  })

  return Number((scaled * 100).toFixed(3))
}
