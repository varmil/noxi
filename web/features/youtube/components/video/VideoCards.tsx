import { PropsWithoutRef } from 'react'
import { getVideos } from 'features/youtube/api/getVideos'
import VideoCard from 'features/youtube/components/video/VideoCard'

type Props = { channelId: string }

export async function VideoCards({ channelId }: PropsWithoutRef<Props>) {
  const videos = await getVideos({ channelId })
  return (
    <>
      {videos.map(video => {
        const { id } = video
        return <VideoCard key={id} {...video} />
      })}
    </>
  )
}
