import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getVideosInChannel } from 'api/youtube/getVideosInChannel'
import VideoCard from 'features/youtube/video/components/VideoCard'

type Props = { channelId: string; gridClassName: string }

export async function VideoInChannelGallery({
  channelId,
  gridClassName
}: PropsWithoutRef<Props>) {
  const videos = await getVideosInChannel({ channelId })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest {videos.length} videos</CardTitle>
        <CardDescription>
          The latest {videos.length} videos are displayed.
        </CardDescription>
      </CardHeader>
      <CardContent className={`grid gap-x-2 gap-y-4 ${gridClassName ?? ''}`}>
        {videos.map(video => {
          const { id } = video
          return <VideoCard key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
