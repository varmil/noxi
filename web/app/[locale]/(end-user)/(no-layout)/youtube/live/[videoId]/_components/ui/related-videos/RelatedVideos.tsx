import { PropsWithChildren, PropsWithoutRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'components/styles/Image'
import Watching from 'components/styles/number/Watching'
import Views from 'components/youtube/statistics/Views'
import { Link } from 'lib/navigation'
import { getRelatedVideos } from '../../../utils/getRelatedVideos'

export default async function RelatedVideos({
  channelId,
  className
}: PropsWithoutRef<{ channelId: string; className?: string }>) {
  const relatedVideos = await getRelatedVideos({
    channelId: channelId
  })

  return (
    <Card
      className={`bg-secondary border-none lg:bg-transparent lg:shadow-none ${
        className ?? ''
      }`}
    >
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
