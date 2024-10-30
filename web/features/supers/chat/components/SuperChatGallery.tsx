import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { CommentGalleryContainer } from 'components/comment/gallery/CommentGalleryContainer'
import {
  CommentGalleryContent,
  CommentGalleryFirstView,
  CommentGalleryMore
} from 'components/comment/gallery/CommentGalleryContent'
import CommentGalleryHeader from 'components/comment/gallery/CommentGalleryHeader'
import SuperChat from 'features/supers/chat/components/SuperChat'

const FIRST_VIEW_LIMIT = 30

type Props = {
  videoId?: string
  channelId?: string
  createdBefore?: Date
  createdAfter?: Date
  limit?: number

  /** @default false */
  showStreamLink?: boolean
}

export default async function SuperChatGallery({
  videoId,
  channelId,
  createdBefore,
  createdAfter,
  limit = 1000,
  showStreamLink = false
}: PropsWithoutRef<Props>) {
  const [chats, t] = await Promise.all([
    getSuperChats({
      videoId,
      channelId,
      createdBefore,
      createdAfter,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit
    }),
    getTranslations('Features.supers.chat')
  ])

  let streams: StreamsSchema | undefined
  if (showStreamLink) {
    streams = await getStreams({
      videoIds: chats.map(chat => chat.videoId),
      orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
      limit
    })
  }

  const isCollapsible = chats.length > FIRST_VIEW_LIMIT
  const firstView = chats.slice(0, FIRST_VIEW_LIMIT)
  const more = chats.slice(FIRST_VIEW_LIMIT)

  return (
    <CommentGalleryContainer>
      <CommentGalleryHeader>
        {t('count', { count: chats.length.toLocaleString() })}
      </CommentGalleryHeader>
      <CommentGalleryContent>
        <CommentGalleryFirstView>
          {firstView.map(chat => (
            <SuperChat
              key={chat.id}
              chat={chat}
              stream={streams?.find(s => s.videoId === chat.videoId)}
            />
          ))}
        </CommentGalleryFirstView>
        {isCollapsible && (
          <CommentGalleryMore>
            {more.map(chat => (
              <SuperChat
                key={chat.id}
                chat={chat}
                stream={streams?.find(s => s.videoId === chat.videoId)}
              />
            ))}
          </CommentGalleryMore>
        )}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
