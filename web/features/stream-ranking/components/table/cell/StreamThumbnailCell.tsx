import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'

export default function StreamThumbnailCell({
  stream
}: {
  stream: StreamSchema
}) {
  const videoId = stream.videoId
  return (
    <LinkCell
      width={80}
      videoId={videoId}
      className="min-w-[48px] max-w-[96px] relative"
    >
      <VideoThumbnail
        size="high"
        title={stream.snippet.title}
        thumbnails={stream.snippet.thumbnails}
        className="min-w-[48px] max-w-[96px] rounded"
      />
    </LinkCell>
  )
}
