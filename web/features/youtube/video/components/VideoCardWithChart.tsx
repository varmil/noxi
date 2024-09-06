import { VideoSchema } from 'api/youtube/schema/videoSchema'
import VideoCard from 'features/youtube/video/components/VideoCard'
import { CommentsRadialChart } from 'features/youtube/video/components/chart/CommentsRadialChart'
import { LikesRadialChart } from 'features/youtube/video/components/chart/LikesRadialChart'

export default function VideoCardWithChart(video: VideoSchema) {
  const { id, snippet, duration, likeRate, commentRate } = video

  return (
    <>
      <section className="grid grid-cols-3 grid-rows-2 gap-0">
        <div className="col-span-2 row-span-2">
          <VideoCard {...video} />
        </div>
        <div className="col-span-1 row-span-1">
          <LikesRadialChart rate={likeRate} />
        </div>
        <div className="col-span-1 row-span-1">
          <CommentsRadialChart rate={commentRate} />
        </div>
      </section>
    </>
  )
}
