import { useFormatter, useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'api/youtube/schema/videoSchema'
import Bullet from 'components/styles/Bullet'
import Image from 'components/styles/Image'
import { RadialChart } from 'features/youtube/video/components/RadialChart'
import VideoCard from 'features/youtube/video/components/VideoCard'
import { humanizeDuration } from 'lib/dayjs'

export default function VideoCardWithChart(video: VideoSchema) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.video')
  const { id, snippet, duration, statistics } = video
  const { title, description, thumbnails, publishedAt } = snippet
  const { viewCount } = statistics

  return (
    <>
      <section className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-4">
        <div className="col-span-2 row-span-2">
          <VideoCard {...video} />
        </div>
        <div className="col-span-1 row-span-1">
          <RadialChart />
        </div>
        <div className="col-span-1 row-span-1">
          <RadialChart />
        </div>
      </section>
    </>
  )
}
