import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const isScheduled = stream.status === 'scheduled'
  return (
    <TabsList className="grid w-full grid-cols-2 mb-4">
      <TabsTrigger value="superChat" disabled={isScheduled}>
        Super Chat
      </TabsTrigger>
      <TabsTrigger value="overview">Overview</TabsTrigger>
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
