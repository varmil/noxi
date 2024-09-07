import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getVideosInChannel } from 'api/youtube/getVideosInChannel'
import VideoCardWithChart from 'features/youtube/video/components/VideoCardWithChart'

type Props = { channelId: string }

export async function VideoInChannelGallery({
  channelId
}: PropsWithoutRef<Props>) {
  const videos = await getVideosInChannel({ channelId })
  const gridClassName =
    'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest {videos.length} videos</CardTitle>
        <CardDescription>
          The latest {videos.length} videos are displayed.
        </CardDescription>
      </CardHeader>
      <CardContent className={`grid gap-x-4 gap-y-4 ${gridClassName}`}>
        {videos.map(video => {
          const { id } = video
          return <VideoCardWithChart key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
