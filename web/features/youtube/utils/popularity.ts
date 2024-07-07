import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { normalize } from 'lib/normalization'

const VIEW_COUNT_RANGE = [0, 50000000]
const SUBS_COUNT_RANGE = [0, 5000000]
const VIDEO_COUNT_RANGE = [0, 500]

/**
 * @returns 0 - 100: Percentage to 3 decimal places
 */
export const getPopularity = ({
  viewCount,
  subscriberCount,
  videoCount
}: ChannelSchema['statistics']): number => {
  const scaledView = normalize(viewCount, {
    min: VIEW_COUNT_RANGE[0],
    max: VIEW_COUNT_RANGE[1]
  })

  const scaledSubs = normalize(subscriberCount, {
    min: SUBS_COUNT_RANGE[0],
    max: SUBS_COUNT_RANGE[1]
  })

  const scaledVideo = normalize(videoCount, {
    min: VIDEO_COUNT_RANGE[0],
    max: VIDEO_COUNT_RANGE[1]
  })

  return Number(
    (((scaledView + scaledSubs + scaledVideo) / 3) * 100).toFixed(3)
  )
}
