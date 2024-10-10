import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getChannels } from 'apis/youtube/getChannels'
import { getStatistics } from 'apis/youtube/getStatistics'
import { getStreams } from 'apis/youtube/getStreams'
import Image from 'components/styles/Image'
import Watching from 'components/styles/number/Watching'
import Views from 'components/youtube/statistics/Views'
import { getGroup } from 'lib/server-only-context/cache'
import { useRelatedVideos } from '../../../_hooks/useRelatedVideos'

export default async function RelatedVideos({
  channelId
}: PropsWithoutRef<{ channelId: string }>) {
  const [liveStreams, endedStreams] = await Promise.all([
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
  const streams = liveStreams.concat(endedStreams)
  const [t, channels, statisticsList] = await Promise.all([
    getTranslations('Features.stream'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getStatistics({ videoIds: endedStreams.map(stream => stream.videoId) })
  ])

  const relatedVideos = useRelatedVideos({
    liveStreams,
    endedStreams,
    channels,
    statisticsList
  })

  return (
    <Card className="bg-secondary border-none lg:bg-transparent lg:shadow-none">
      <CardHeader className="lg:hidden">
        <CardTitle>Related Videos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:px-0">
        {relatedVideos.map(video => (
          <div key={video.id} className="flex space-x-2">
            <Image
              src={video.thumbnail ?? ''}
              alt={video.title}
              className="w-40 h-24 object-cover rounded-md"
              width={160}
              height={96}
            />
            <div>
              <h3 className="break-anywhere text-sm line-clamp-2 mb-0.5">
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
          </div>
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
