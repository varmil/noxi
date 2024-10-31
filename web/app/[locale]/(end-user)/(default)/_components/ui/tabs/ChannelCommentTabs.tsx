import { ChannelCommentTabsOnClient } from 'app/[locale]/(end-user)/(default)/_components/ui/tabs/ChannelCommentTabsOnClient'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'
import YoutubeCommentGallery from 'features/youtube/comment/YoutubeCommentGallery'

export function ChannelCommentTabs({ channelId }: { channelId: string }) {
  return (
    <ChannelCommentTabsOnClient
      superChat={
        <SuperChatGallery
          channelId={channelId}
          createdAfter={new Date(new Date().getTime() - 168 * 60 * 60 * 1000)}
          limit={30}
          showStreamLink
        />
      }
      comments={
        <YoutubeCommentGallery
          channelId={channelId}
          order="time"
          limit={30}
          showStreamLink
        />
      }
    />
  )
}
