import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { searchVideos } from 'api/youtube/searchVideos'
import VideoCard from 'features/youtube/video/components/VideoCard'
import dayjs from 'lib/dayjs'

type Props = { channelId?: string }

export async function HighlightClipGallery({}: PropsWithoutRef<Props>) {
  const videos = await searchVideos({
    q: 'ホロライブ　切り抜き',
    limit: 12,
    order: 'relevance',
    publishedAfter: dayjs().subtract(3, 'days').toDate()
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest {videos.length} videos</CardTitle>
        <CardDescription>
          The latest {videos.length} videos are displayed.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4`}
      >
        {videos.map(video => {
          const { id } = video
          return <VideoCard key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
