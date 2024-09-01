import { useFormatter, useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'api/youtube/schema/videoSchema'
import Bullet from 'components/styles/Bullet'
import Image from 'components/styles/Image'
import { humanizeDuration } from 'lib/dayjs'

export default function VideoCard(video: VideoSchema) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.video')
  const { id, snippet, duration, statistics } = video
  const { title, description, thumbnails, publishedAt } = snippet
  const { viewCount } = statistics

  return (
    <Card className="w-full border-none shadow-none">
      {/* <Link
        href="#"
        className="group relative block aspect-video overflow-hidden rounded-lg"
        prefetch={false}
      > */}
      <a
        className="group relative block aspect-video overflow-hidden rounded-lg"
        href={`https://youtube.com/watch?v=${id}`}
        target="_blank"
      >
        <Image
          src={{
            '1x': thumbnails['standard']?.url,
            '2x': thumbnails['maxres']?.url
          }}
          alt={`Video Thumbnail: ${title}`}
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {/* TODO: When /videos/:id page is created, comment in here. */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <LineChart className="h-12 w-12 text-white" />
        </div> */}
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>{humanizeDuration(duration)}</span>
        </div>
      </a>
      {/* </Link> */}
      <CardContent className="p-2 space-y-1 px-1 pt-2">
        <div>
          <h3 className="font-normal line-clamp-2 text-sm sm:text-base/5">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>
              {t('views', {
                count: format.number(viewCount, { notation: 'compact' })
              })}
            </span>
            <Bullet />
            <span>{format.relativeTime(new Date(publishedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
