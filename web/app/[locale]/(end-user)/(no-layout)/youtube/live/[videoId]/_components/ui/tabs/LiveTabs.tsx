import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getViewerCounts } from 'apis/youtube/getViewerCounts'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ChatCounts from 'features/stream-stats/chart/ChatCounts'
import ViewerCounts from 'features/stream-stats/chart/ViewerCounts'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'
import YoutubeCommentGallery from 'features/youtube/comment/YoutubeCommentGallery'
import RelatedVideos from '../related-videos/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'
import StreamStatsCards from '../stream/card/StreamStatsCards'

export function LiveTabs({ children }: { children: React.ReactNode }) {
  const defaultValue = 'overview'
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      {children}
    </Tabs>
  )
}

export async function LiveTabsList({ stream }: { stream: StreamSchema }) {
  const [{ statistics } = {}] = await getStatistics({
    videoIds: [stream.videoId]
  })
  const isLive = stream.status === 'live'
  const isEnded = stream.status === 'ended'
  return (
    <TabsList className="w-full mb-4">
      <TabsTrigger className="flex-1" value="overview">
        Overview
      </TabsTrigger>
      {(isLive || isEnded) && (
        <TabsTrigger className="flex-1" value="superChat">
          Super Chat
        </TabsTrigger>
      )}
      {isEnded && statistics?.commentCount && (
        <TabsTrigger className="flex-1" value="comments">
          Comments
        </TabsTrigger>
      )}
    </TabsList>
  )
}

/** SuperChat: Hide when scheduled */
export async function LiveTabsSuperChatContent({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const { videoId, status } = stream
  if (status === 'scheduled') return null

  return (
    <TabsContent
      value="superChat"
      forceMount
      className={'data-[state=inactive]:content-visibility-hidden'}
    >
      <SuperChatGallery videoId={videoId} />
    </TabsContent>
  )
}

/** Comments: Show only ended streams && commentCount exists */
export async function LiveTabsCommentsContent({
  stream
}: {
  stream: StreamSchema
}) {
  const [{ statistics } = {}] = await getStatistics({
    videoIds: [stream.videoId]
  })

  const { videoId, status } = stream
  if (status !== 'ended' || !statistics?.commentCount) return null

  return (
    <TabsContent
      value="comments"
      forceMount
      className={'data-[state=inactive]:content-visibility-hidden'}
    >
      <YoutubeCommentGallery videoId={videoId} />
    </TabsContent>
  )
}

/** タイトル、投稿者情報 */
export async function LiveTabsOverviewContent({
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
    <TabsContent
      value="overview"
      forceMount
      className={`data-[state=inactive]:content-visibility-hidden`}
    >
      <div className={`${className ?? ''}`}>
        <StreamBasicInfo stream={stream} />
        <StreamStatsCards stream={stream} />
        <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
        <ChatCounts stream={stream} chatCounts={chatCounts} />
        <RelatedVideos
          className="@xs:block @4xl:hidden"
          channelId={channelId}
        />
      </div>
    </TabsContent>
  )
}
