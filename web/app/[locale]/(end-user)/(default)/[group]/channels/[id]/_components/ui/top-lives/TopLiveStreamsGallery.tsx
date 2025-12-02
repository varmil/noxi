import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import dayjs from 'lib/dayjs'
import TopLiveStreamCard from './TopLiveStreamCard'

type Props = {
  channelId: string
}

export default async function TopLiveStreamsGallery({ channelId }: Props) {
  const feat = await getTranslations('Features.channel.overview.topLives')

  // 過去30日間のデータを取得
  const thirtyDaysAgo = dayjs().subtract(30, 'days').toDate()

  const streams = await getStreams({
    status: 'ended',
    channelId,
    endedAfter: thirtyDaysAgo,
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 3
  })

  if (streams.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        {feat('noLives')}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {streams.map((stream, index) => (
        <TopLiveStreamCard
          key={stream.videoId}
          stream={stream}
          rank={index + 1}
        />
      ))}
    </div>
  )
}
