import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import LinkCell from './base/LinkCell'

export default function TableCellOfStreamThumbnail({
  stream
}: {
  stream: StreamSchema
}) {
  const videoId = stream.videoId
  return (
    <LinkCell
      videoId={videoId}
      className="min-w-[150px] max-w-[200px] relative"
    >
      <VideoThumbnail
        size="high"
        title={stream.snippet.title}
        thumbnails={stream.snippet.thumbnails}
        className="min-w-[150px] max-w-[200px] rounded-sm"
      />
      <GroupImageOrIcon
        className="@lg:hidden absolute bottom-0.5 right-0 bg-background p-1.5 w-7 h-7"
        groupId={stream.group}
      />
    </LinkCell>
  )
}
