import { PropsWithoutRef } from 'react'
import { getVideosInChannel } from 'features/youtube/api/getVideosInChannel'
import VideoCard from 'features/youtube/components/video/VideoCard'

type Props = { channelId: string }

export async function VideoCards({ channelId }: PropsWithoutRef<Props>) {
  const videos = await getVideosInChannel({ channelId })
  return (
    <>
      {videos.map(video => {
        const { id } = video
        return <VideoCard key={id} {...video} />
      })}
    </>
  )
}
