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
    <div className="relative w-32 aspect-video rounded overflow-hidden">
      <Link href={`/youtube/live/${videoId}`}>
        <VideoThumbnail size="default" title={title} thumbnails={thumbnails} />
        {children}
      </Link>
    </div>
  )
}
