import { VideoSchema } from 'api/youtube/schema/videoSchema'
import VideoCard from 'features/youtube/video/components/VideoCard'
import { CommentsRadialChart } from 'features/youtube/video/components/chart/CommentsRadialChart'
import { LikesRadialChart } from 'features/youtube/video/components/chart/LikesRadialChart'

export default function VideoCardWithChart(video: VideoSchema) {
  const { likeRate, commentRate } = video

  return (
    <>
      <section className="grid grid-cols-7 grid-rows-3 gap-y-0.5">
        <div className="col-span-5 row-span-3">
          <VideoCard {...video} />
        </div>
        <div className="col-span-2 row-span-1">
          <CommentsRadialChart rate={commentRate} />
        </div>
        <div className="col-span-2 row-span-1">
          <LikesRadialChart rate={likeRate} />
        </div>
      </section>
    </>
  )
}
