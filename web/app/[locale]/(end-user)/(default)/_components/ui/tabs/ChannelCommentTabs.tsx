import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'
import YoutubeCommentGallery from 'features/youtube/comment/YoutubeCommentGallery'

export function ChannelCommentTabs({ channelId }: { channelId: string }) {
  return (
    <Tabs defaultValue={'superChat'} className="w-full">
      <TabsList className=" w-full mb-4">
        <TabsTrigger className="flex-1" value="superChat">
          Super Chat
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="comments">
          Comments
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[493px] rounded-md border p-4">
        <TabsContent value="superChat">
          {/* -72 hours from now */}
          <SuperChatGallery
            channelId={channelId}
            createdAfter={new Date(new Date().getTime() - 72 * 60 * 60 * 1000)}
            limit={30}
            showStreamLink
          />
        </TabsContent>
        <TabsContent value="comments">
          <YoutubeCommentGallery
            channelId={channelId}
            order="time"
            limit={30}
          />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
