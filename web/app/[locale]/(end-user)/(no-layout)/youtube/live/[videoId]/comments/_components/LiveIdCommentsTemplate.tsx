import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import YoutubeCommentGallery from 'features/youtube/comment/YoutubeCommentGallery'

type Props = { videoId: string }

export async function LiveIdCommentsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)

  return <Comments stream={stream} />
}

async function Comments({ stream }: { stream: StreamSchema }) {
  const t = await getTranslations('Features.live.comments')
  const [{ statistics } = {}] = await getStatistics({
    videoIds: [stream.videoId]
  })

  const { videoId, status } = stream
  if (status !== 'ended' || !statistics?.commentCount)
    return <p>{t('notice')}</p>

  return <YoutubeCommentGallery videoId={videoId} />
}
