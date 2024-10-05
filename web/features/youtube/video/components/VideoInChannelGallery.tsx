import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getVideosInChannel } from 'apis/youtube/getVideosInChannel'
import VideoCard from 'features/youtube/video/components/VideoCard'

type Props = { channelId: string }

/** ライブ配信「以外」の最新の動画一覧を取得・表示 */
export async function VideoInChannelGallery({
  channelId
}: PropsWithoutRef<Props>) {
  const videos = (await getVideosInChannel({ channelId, limit: 50 })).filter(
    video => !video.liveStreamingDetails
  )
  const gridClassName =
    'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest {videos.length} videos</CardTitle>
        <CardDescription>
          Displays non-live streaming videos. Includes videos and shorts.
        </CardDescription>
      </CardHeader>
      <CardContent className={`grid gap-x-4 gap-y-4 ${gridClassName}`}>
        {videos.map(video => {
          const { id } = video
          return <VideoCard key={id} {...video} />
        })}
      </CardContent>
    </Card>
  )
}
