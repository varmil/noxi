import { useFormatter, useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'apis/youtube/schema/videoSchema'
import Bullet from 'components/styles/Bullet'
import Image from 'components/styles/Image'
import Views from 'components/youtube/statistics/Views'
import { humanizeDuration } from 'lib/dayjs'

export default function VideoCard(video: VideoSchema) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.video')
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
        <Image
          src={{
            '1x':
              thumbnails['standard']?.url ||
              thumbnails['high']?.url ||
              thumbnails['default']?.url,
            '2x':
              thumbnails['maxres']?.url ||
              thumbnails['high']?.url ||
              thumbnails['default']?.url
          }}
          alt={`Video Thumbnail: ${title}`}
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
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
