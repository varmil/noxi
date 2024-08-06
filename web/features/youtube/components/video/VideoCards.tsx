import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getVideosInChannel } from 'features/youtube/api/getVideosInChannel'
import VideoCard from 'features/youtube/components/video/VideoCard'

type Props = { channelId: string; mdGridCols: number; lgGridCols: number }

export async function VideoCards({
  channelId,
  mdGridCols,
  lgGridCols
}: PropsWithoutRef<Props>) {
  const videos = await getVideosInChannel({ channelId })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest 36 videos</CardTitle>
        <CardDescription>The latest 36 videos are displayed.</CardDescription>
      </CardHeader>
      <CardContent
        className={`grid gap-2 md:grid-cols-${mdGridCols} lg:grid-cols-${lgGridCols}`}
      >
        {videos.map(video => {
          const { id } = video
          return <VideoCard key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
