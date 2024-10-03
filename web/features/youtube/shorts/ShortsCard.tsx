import { useFormatter, useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'apis/youtube/schema/videoSchema'
import Image from 'components/styles/Image'
import Views from 'components/youtube/statistics/Views'

export default function ShortsCard(video: VideoSchema) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.video')
  const { id, snippet, statistics } = video
  const { title, description, thumbnails, publishedAt } = snippet
  const { viewCount } = statistics

  return (
    <a className="" href={`https://youtube.com/watch?v=${id}`} target="_blank">
      <Card className="overflow-hidden bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-[9/16]">
            <Image
              src={{
                '1x': thumbnails['standard']?.url,
                '2x': thumbnails['maxres']?.url
              }}
              alt={`YouTube Shorts Thumbnail: ${title}`}
              width={30 * 9}
              height={30 * 16}
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
        <div className="p-1">
          <h3 className="font-normal line-clamp-2 text-sm sm:text-base/5 mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            <Views views={viewCount} />
          </p>
        </div>
      </Card>
    </a>
  )
}
