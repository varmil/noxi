import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getChannels } from 'apis/youtube/getChannels'
import Bullet from 'components/styles/Bullet'
import LiveBadge from 'components/styles/badge/LiveBadge'
import StreamedLive from 'components/styles/date/StreamedLive'
import Watched from 'components/styles/number/Watched'
import Watching from 'components/styles/number/Watching'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import { Link } from 'lib/navigation'
import { getRelatedVideos } from '../../../utils/getRelatedVideos'

export default async function RelatedVideos({
  type,
  channelId
}: PropsWithoutRef<{
  type: 'live' | 'ended'
  channelId: string
  className?: string
}>) {
  const relatedVideos = await getRelatedVideos({
    type,
    channelId: channelId
  })
  const [channels] = await Promise.all([
    getChannels({
      ids: relatedVideos.map(stream => stream.snippet.channelId),
      limit: relatedVideos.length
    })
  ])

  return (
    <section>
      <div className="space-y-4 px-0">
        {relatedVideos.map(stream => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null

          const {
            videoId,
            snippet,
            status,
            metrics: { peakConcurrentViewers },
            streamTimes: { actualEndTime }
          } = stream

          return (
            <Link
              className="flex space-x-2"
              key={videoId}
              href={`/youtube/live/${videoId}`}
            >
              <div className="w-42">
                <VideoThumbnail
                  title={snippet.title}
                  thumbnails={snippet.thumbnails}
                  className="rounded-md"
                  size={'medium'}
                />
              </div>
              <div className="flex-1">
                <h3 className="break-anywhere text-sm line-clamp-2 mb-1">
                  {snippet.title}
                </h3>
                <WeakLine>{channel.basicInfo.title}</WeakLine>
                <WeakLine>
                  {status === 'live' ? (
                    <Watching count={peakConcurrentViewers} />
                  ) : null}
                  {status === 'ended' ? (
                    <>
                      {!!peakConcurrentViewers && (
                        <>
                          <Watched count={peakConcurrentViewers} />
                          <Bullet />
                        </>
                      )}
                      {actualEndTime && <StreamedLive date={actualEndTime} />}
                    </>
                  ) : null}
                </WeakLine>
                {status === 'live' ? (
                  <WeakLine>
                    <LiveBadge className="w-fit" />
                  </WeakLine>
                ) : null}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

const WeakLine = ({ children }: PropsWithChildren) => (
  <div className="text-xs sm:text-sm line-clamp-1 text-muted-foreground">
    {children}
  </div>
)
