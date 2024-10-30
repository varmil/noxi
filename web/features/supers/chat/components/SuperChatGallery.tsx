import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSuperChats } from 'apis/youtube/getSuperChats'
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
}

export default async function SuperChatGallery({
  videoId,
  channelId,
  createdBefore,
  createdAfter,
  limit = 1000
}: PropsWithoutRef<Props>) {
  const [chats] = await Promise.all([
    getSuperChats({
      videoId,
      channelId,
      createdBefore,
      createdAfter,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit
    })
  ])
  const t = await getTranslations('Features.supers.chat')

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
            <SuperChat key={chat.id} chat={chat} />
          ))}
        </CommentGalleryFirstView>
        {isCollapsible && (
          <CommentGalleryMore>
            {more.map(chat => (
              <SuperChat key={chat.id} chat={chat} />
            ))}
          </CommentGalleryMore>
        )}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
