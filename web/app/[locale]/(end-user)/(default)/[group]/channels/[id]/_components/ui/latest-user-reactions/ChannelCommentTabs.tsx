import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'
import YoutubeCommentGallery from 'features/youtube/comment/YoutubeCommentGallery'

export function ChannelCommentTabs({ channelId }: { channelId: string }) {
  return (
    <Tabs defaultValue={'superChat'} className="w-full">
      <TabsList className="w-full mb-2">
        <TabsTrigger className="flex-1" value="superChat">
          Super Chat
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="comments">
          Comments
        </TabsTrigger>
      </TabsList>

      <section>
        <TabsContent
          forceMount
          value="superChat"
          className={'data-[state=inactive]:content-visibility-hidden'}
        >
          <SuperChatGallery
            channelId={channelId}
            createdAfter={
              new Date(new Date().getTime() - 24 * 30 * 60 * 60 * 1000)
            }
            limit={30}
            showStreamLink
          />
        </TabsContent>
        <TabsContent
          forceMount
          value="comments"
          className={'data-[state=inactive]:content-visibility-hidden'}
        >
          <YoutubeCommentGallery
            channelId={channelId}
            order="time"
            limit={30}
            showStreamLink
          />
        </TabsContent>
      </section>
    </Tabs>
  )
}
