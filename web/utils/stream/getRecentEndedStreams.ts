import { getStreams } from 'apis/youtube/getStreams'
import { getStartOf } from 'utils/period/ranking'

/**
 * last30Days
 */
export const getRecentEndedStreams = async ({
  channelId
}: {
  channelId: string
}) => {
  const streams = await getStreams({
    status: 'ended',
    channelId,
    endedAfter: getStartOf('last30Days').toDate(),
    limit: 100
  })

  return streams
}
