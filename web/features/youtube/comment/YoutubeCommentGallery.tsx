import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getCommentThreads } from 'apis/youtube/data-api/getCommentThreads'
import { CommentGalleryContainer } from 'components/comment/gallery/CommentGalleryContainer'
import {
  CommentGalleryContent,
  CommentGalleryFirstView,
  CommentGalleryMore
} from 'components/comment/gallery/CommentGalleryContent'
import CommentGalleryHeader from 'components/comment/gallery/CommentGalleryHeader'
import YoutubeComment from 'features/youtube/comment/YoutubeComment'

const FIRST_VIEW_LIMIT = 30

type Props = {
  videoId?: string
}

export default async function YoutubeCommentGallery({
  videoId
}: PropsWithoutRef<Props>) {
  const [t, threads] = await Promise.all([
    getTranslations('Features.youtube.comment'),
    getCommentThreads({ videoId })
  ])

  const isCollapsible = threads.length > FIRST_VIEW_LIMIT
  const firstView = threads.slice(0, FIRST_VIEW_LIMIT)
  const more = threads.slice(FIRST_VIEW_LIMIT)

  return (
    <CommentGalleryContainer>
      <CommentGalleryHeader>
        {t('count', { count: threads.length.toLocaleString() })}
      </CommentGalleryHeader>
      <CommentGalleryContent>
        <CommentGalleryFirstView>
          {firstView.map(thread => (
            <YoutubeComment key={thread.id} thread={thread} />
          ))}
        </CommentGalleryFirstView>
        {isCollapsible && (
          <CommentGalleryMore>
            {more.map(thread => (
              <YoutubeComment key={thread.id} thread={thread} />
            ))}
          </CommentGalleryMore>
        )}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
