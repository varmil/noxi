import { PropsWithChildren } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'

export default function StreamImg({
  stream,
  children
}: PropsWithChildren<{ stream: StreamSchema }>) {
  const {
    videoId,
    snippet: { title, thumbnails }
  } = stream

  return (
    <div className="relative w-46 aspect-video rounded-tl-xl overflow-hidden">
      <VideoThumbnail size="default" title={title} thumbnails={thumbnails} />
      {children}
    </div>
  )
}
