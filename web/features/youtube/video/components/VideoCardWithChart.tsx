import { useFormatter, useTranslations } from 'next-intl'
import { VideoSchema } from 'api/youtube/schema/videoSchema'
import VideoCard from 'features/youtube/video/components/VideoCard'
import { CommentsRadialChart } from 'features/youtube/video/components/chart/CommentsRadialChart'
import { LikesRadialChart } from 'features/youtube/video/components/chart/LikesRadialChart'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

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
          <LikesRadialChart rate={video.likeRate} />
        </div>
        <div className="col-span-1 row-span-1">
          <CommentsRadialChart rate={video.commentRate} />
        </div>
      </section>
    </>
  )
}
