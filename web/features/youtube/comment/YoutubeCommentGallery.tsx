import { PropsWithoutRef } from 'react'
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
import YoutubeComments from 'features/youtube/comment/YoutubeComments'

const FIRST_VIEW_LIMIT = 30

type Props = {
  channelId?: string
  videoId?: string
  order?: 'time' | 'relevance'
  limit?: number

  /** @default false */
  showStreamLink?: boolean
}

export default async function YoutubeCommentGallery({
  channelId,
  videoId,
  order,
  limit,
  showStreamLink = false
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
    const [{ statistics } = {}] = await getStatistics({ videoIds: [videoId] })
    count = statistics?.commentCount?.toLocaleString() || '0'
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
          <YoutubeComments
            threads={firstView}
            showStreamLink={showStreamLink}
          />
        </CommentGalleryFirstView>
        {isCollapsible && (
          <CommentGalleryMore>
            <YoutubeComments threads={more} showStreamLink={showStreamLink} />
          </CommentGalleryMore>
        )}
      </CommentGalleryContent>
    </CommentGalleryContainer>
  )
}
