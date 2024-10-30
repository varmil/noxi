import { PropsWithoutRef } from 'react'
import { channel } from 'diagnostics_channel'
import { getTranslations } from 'next-intl/server'
import { getCommentThreads } from 'apis/youtube/data-api/getCommentThreads'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
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
  channelId?: string
  videoId?: string
  order?: 'time' | 'relevance'
  limit?: number
}

export default async function YoutubeCommentGallery({
  channelId,
  videoId,
  order,
  limit
}: PropsWithoutRef<Props>) {
  if (!channelId && !videoId) {
    throw new Error('Either channelId or videoId is required')
  }

  const [t, threads] = await Promise.all([
    getTranslations('Features.youtube.comment'),
    getCommentThreads({
      videoId,
      allThreadsRelatedToChannelId: channelId,
      order,
      maxResults: limit
    })
  ])

  let count = '0'
  if (videoId) {
    const [video] = await getStatistics({ videoIds: [videoId] })
    count = video.statistics.commentCount?.toLocaleString() ?? '0'
  } else if (channelId) {
    count = threads.length.toLocaleString() ?? '0'
  }

  const isCollapsible = threads.length > FIRST_VIEW_LIMIT
  const firstView = threads.slice(0, FIRST_VIEW_LIMIT)
  const more = threads.slice(FIRST_VIEW_LIMIT)

  return (
    <CommentGalleryContainer>
      <CommentGalleryHeader>{t('count', { count })}</CommentGalleryHeader>
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
