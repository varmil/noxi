import { getVideos } from 'features/youtube/api/getVideos'
import VideoCard from 'features/youtube/components/video/VideoCard'

export async function VideoCards() {
  const videos = await getVideos()
  return (
    <>
      {videos.map(video => {
        const { id } = video
        return <VideoCard key={id} {...video} />
      })}
    </>
  )
}
