import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import CommentGalleryContainer from 'components/comment/gallery/CommentGalleryContainer'
import CommentGalleryContent from 'components/comment/gallery/CommentGalleryContent'
import CommentGalleryHeader from 'components/comment/gallery/CommentGalleryHeader'
import SuperChat from 'features/supers/chat/components/SuperChat'

type Props = {
  videoId?: string
}

export default async function SuperChatGallery({
  videoId
}: PropsWithoutRef<Props>) {
  const [chats] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit: 1000
    })
  ])

  const t = await getTranslations('Features.supers.chat')

  return (
    <CommentGalleryContainer>
      <CommentGalleryHeader>
        {t('count', { count: chats.length.toLocaleString() })}
      </CommentGalleryHeader>
      <CommentGalleryContent>
        {chats.map((chat, i) => (
          <SuperChat key={i} chat={chat} />
        ))}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
