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
import SuperChats from 'features/supers/chat/components/SuperChats'

const FIRST_VIEW_LIMIT = 30

type Props = {
  videoId?: string
  channelId?: string
  createdAfter?: Date
  limit?: number

  /** @default false */
  showStreamLink?: boolean
}

export default async function SuperChatGallery({
  videoId,
  channelId,
  createdAfter,
  limit = 2000,
  showStreamLink = false
}: PropsWithoutRef<Props>) {
  const [chats, t] = await Promise.all([
    getSuperChats({
      videoId,
      channelId,
      createdAfter,
      orderBy: [
        { field: 'amountMicros', order: 'desc' },
        { field: 'createdAt', order: 'desc' }
      ],
      limit
    }),
    getTranslations('Features.supers.chat')
  ])

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
          <SuperChats chats={firstView} showStreamLink={showStreamLink} />
        </CommentGalleryFirstView>
        {isCollapsible && (
          <CommentGalleryMore>
            <SuperChats chats={more} showStreamLink={showStreamLink} />
          </CommentGalleryMore>
        )}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
