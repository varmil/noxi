import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCommentThreads } from 'apis/youtube/data-api/getCommentThreads'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getViewerCounts } from 'apis/youtube/getViewerCounts'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ChatCounts from 'features/stream-stats/chart/ChatCounts'
import ViewerCounts from 'features/stream-stats/chart/ViewerCounts'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'
import RelatedVideos from '../related-videos/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'
import StreamStatsCards from '../stream/card/StreamStatsCards'

export function LiveTabs({
  stream,
  children
}: {
  stream: StreamSchema
  children: React.ReactNode
}) {
  const isScheduled = stream.status === 'scheduled'
  const defaultValue = isScheduled ? 'overview' : 'superChat'
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      {children}
    </Tabs>
  )
}

export function LiveTabsList({ stream }: { stream: StreamSchema }) {
  const isLive = stream.status === 'live'
  const isEnded = stream.status === 'ended'
  return (
    <TabsList className=" w-full mb-4">
      {(isLive || isEnded) && (
        <TabsTrigger className="flex-1" value="superChat">
          Super Chat
        </TabsTrigger>
      )}
      {isEnded && (
        <TabsTrigger className="flex-1" value="comments">
          Comments
        </TabsTrigger>
      )}
      <TabsTrigger className="flex-1" value="overview">
        Overview
      </TabsTrigger>
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
    <TabsContent value="superChat">
      <SuperChatGallery videoId={videoId} />
    </TabsContent>
  )
}

/** Comments: Show only ended streams */
export async function LiveTabsCommentsContent({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const { videoId, status } = stream
  if (status !== 'ended') return null

  const [commentThreads] = await Promise.all([getCommentThreads({ videoId })])

  console.log(
    'commentThreads',
    commentThreads.map(
      thread => thread.snippet.topLevelComment.snippet.textDisplay
    )
  )

  return (
    <TabsContent value="comments">
      <SuperChatGallery videoId={videoId} />
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
    <TabsContent value="overview" className={className ?? ''}>
      <StreamBasicInfo stream={stream} />
      <StreamStatsCards stream={stream} />
      <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
      <ChatCounts stream={stream} chatCounts={chatCounts} />
      <RelatedVideos className="@xs:block @4xl:hidden" channelId={channelId} />
    </TabsContent>
  )
}
