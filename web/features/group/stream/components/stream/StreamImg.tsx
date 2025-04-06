import { PropsWithChildren } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'

export default function StreamImg({
  stream,
  className,
  children
}: PropsWithChildren<{ stream: StreamSchema; className?: string }>) {
  const {
    snippet: { title, thumbnails }
  } = stream

  return (
    <div
      className={`relative aspect-video rounded-tl-xl overflow-hidden ${
        className || ''
      }`}
    >
      <VideoThumbnail size="default" title={title} thumbnails={thumbnails} />
      {children}
    </div>
  )
}
