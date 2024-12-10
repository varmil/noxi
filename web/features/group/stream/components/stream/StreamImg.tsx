import { PropsWithChildren } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import { Link } from 'lib/navigation'

export default function StreamImg({
  stream,
  children
}: PropsWithChildren<{ stream: StreamSchema }>) {
  const {
    videoId,
    snippet: { title, thumbnails }
  } = stream

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden">
      <Link href={`/youtube/live/${videoId}`}>
        <VideoThumbnail size="standard" title={title} thumbnails={thumbnails} />
        {children}
      </Link>
    </div>
  )
}
