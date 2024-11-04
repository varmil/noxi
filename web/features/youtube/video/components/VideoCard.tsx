import { useFormatter } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'apis/youtube/schema/videoSchema'
import Bullet from 'components/styles/Bullet'
import Views from 'components/youtube/statistics/Views'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import { humanizeDuration } from 'lib/dayjs'

export default function VideoCard(video: VideoSchema) {
  const format = useFormatter()
  const { id, snippet, duration, statistics } = video
  const { title, thumbnails, publishedAt } = snippet
  const { viewCount } = statistics

  return (
    <Card className="w-full border-none shadow-none">
      <a
        className="group relative block aspect-video overflow-hidden rounded-lg"
        href={`https://youtube.com/watch?v=${id}`}
        target="_blank"
      >
        <VideoThumbnail title={title} thumbnails={thumbnails} />
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>{humanizeDuration(duration)}</span>
        </div>
      </a>
      <CardContent className="p-2 space-y-1 px-1 pt-2">
        <div>
          <h3 className="font-normal line-clamp-2 text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>
              <Views views={viewCount} />
            </span>
            <Bullet />
            <span>{format.relativeTime(new Date(publishedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
