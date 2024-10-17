import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { SuperChatGallery } from 'features/supers/chat/components/SuperChatGallery'
import OpenChatButton from '../button/OpenChatButton'
import RelatedVideos from '../related-videos/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'
import StreamStatsCards from '../stream/card/StreamStatsCards'

export function LiveTabs({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="superChat" className="w-full">
      {children}
    </Tabs>
  )
}

export function LiveTabsList({}: {}) {
  return (
    <TabsList className="grid w-full grid-cols-2 mb-4">
      <TabsTrigger value="superChat">Super Chat</TabsTrigger>
      <TabsTrigger value="overview">Overview</TabsTrigger>
    </TabsList>
  )
}

/** SuperChat */
export async function LiveTabsSuperChatContent({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const { videoId } = stream

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
      <OpenChatButton className="@xs:block @4xl:hidden" />
      <StreamStatsCards stream={stream} />
      <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
      <ChatCounts stream={stream} chatCounts={chatCounts} />
      <RelatedVideos className="@xs:block @4xl:hidden" channelId={channelId} />
    </TabsContent>
  )
}
