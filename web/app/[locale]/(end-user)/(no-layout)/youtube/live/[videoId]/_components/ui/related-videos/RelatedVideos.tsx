import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getChannels } from 'apis/youtube/getChannels'
import { getLiveStreamingDetails } from 'apis/youtube/getLiveStreamingDetails'
import { getStatistics } from 'apis/youtube/getStatistics'
import { getStreams } from 'apis/youtube/getStreams'
import Image from 'components/styles/Image'
import Watching from 'components/styles/number/Watching'
import Views from 'components/youtube/statistics/Views'
import { Link } from 'lib/navigation'
import { getGroup } from 'lib/server-only-context/cache'
import { useRelatedVideos } from '../../../_hooks/useRelatedVideos'

export default async function RelatedVideos({
  channelId
}: PropsWithoutRef<{ channelId: string }>) {
  const [live, ended] = await Promise.all([
    getStreams({
      status: 'live',
      group: getGroup(),
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: 8
    }),
    getStreams({
      status: 'ended',
      channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: 7
    })
  ])
  const streams = live.concat(ended)
  const [t, channels, liveStreamingDetailsList, statisticsList] =
    await Promise.all([
      getTranslations('Features.stream'),
      getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
      getLiveStreamingDetails({ videoIds: live.map(stream => stream.videoId) }),
      getStatistics({ videoIds: ended.map(stream => stream.videoId) })
    ])

  const relatedVideos = useRelatedVideos({
    liveStreams: live,
    endedStreams: ended,
    channels,
    liveStreamingDetailsList,
    statisticsList
  })

  return (
    <Card className="bg-secondary border-none lg:bg-transparent lg:shadow-none">
      <CardHeader className="lg:hidden">
        <CardTitle>Related Videos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:px-0">
        {relatedVideos.map(video => (
          <Link
            className="flex space-x-2"
            key={video.id}
            href={`/youtube/live/${video.id}`}
          >
            <Image
              src={video.thumbnail ?? ''}
              alt={video.title}
              className="w-40 h-24 object-cover rounded-md"
              width={160}
              height={96}
            />
            <div>
              <h3 className="break-anywhere text-sm line-clamp-2 mb-1">
                {video.title}
              </h3>
              <WeakLine>{video.channel}</WeakLine>
              <WeakLine>
                {video.status === 'live' ? (
                  <Watching count={video.concurrentViewers} />
                ) : null}
                {video.status === 'ended' ? (
                  <Views views={video.views} />
                ) : null}
              </WeakLine>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

const WeakLine = ({ children }: PropsWithChildren) => (
  <div className="text-xs sm:text-sm line-clamp-1 text-muted-foreground">
    {children}
  </div>
)
