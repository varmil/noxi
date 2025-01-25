import { PropsWithoutRef } from 'react'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getStream } from 'apis/youtube/getStream'
import { getViewerCounts } from 'apis/youtube/getViewerCounts'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ChatCounts from 'features/stream-stats/chart/ChatCounts'
import ViewerCounts from 'features/stream-stats/chart/ViewerCounts'
import RelatedVideos from '../ui/related-videos/RelatedVideos'
import StreamBasicInfo from '../ui/stream/StreamBasicInfo'
import StreamStatsCards from '../ui/stream/card/StreamStatsCards'
import {
  LiveTabs,
  LiveTabsList,
  LiveTabsCommentsContent
} from '../ui/tabs/LiveTabs'

type Props = { videoId: string }

export async function LiveIdTemplate({ videoId }: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)

  return (
    <LiveTabs>
      <LiveTabsList stream={stream} />
      <LiveTabsCommentsContent stream={stream} />
      <LiveTabsOverviewContent className="space-y-6" stream={stream} />
    </LiveTabs>
  )
}

/** タイトル、投稿者情報 */
async function LiveTabsOverviewContent({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const {
    videoId,
    snippet: { channelId }
  } = stream
  const [chatCounts, viewerCounts] = await Promise.all([
    getChatCounts({ videoId }),
    getViewerCounts({ videoId })
  ])

  return (
    <div className={`${className ?? ''}`}>
      <StreamBasicInfo stream={stream} />
      <StreamStatsCards stream={stream} />
      <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
      <ChatCounts stream={stream} chatCounts={chatCounts} />
      <RelatedVideos className="@xs:block @4xl:hidden" channelId={channelId} />
    </div>
  )
}
