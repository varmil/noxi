import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import VideoCard from 'features/youtube/components/video/VideoCard'
import { getVideosInChannel } from '../../api/getVideosInChannel'

type Props = { channelId: string; gridClassName: string }

export async function VideoCards({
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
      <CardContent className={`grid gap-2 ${gridClassName ?? ''}`}>
        {videos.map(video => {
          const { id } = video
          return <VideoCard key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
