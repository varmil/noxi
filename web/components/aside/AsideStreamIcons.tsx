import { PropsWithoutRef } from 'react'
import { Separator } from '@/components/ui/separator'
import { getChannels } from 'apis/youtube/getChannels'
import { getLiveStreamingDetails } from 'apis/youtube/getLiveStreamingDetails'
import { getStreams } from 'apis/youtube/getStreams'
import AsideIcon from 'components/aside/AsideIcon'
import LiveBadge from 'components/styles/LiveBadge'
import Watching from 'components/styles/number/Watching'

type Props = {}

export default async function AsideStreamIcons({}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 10
  })
  if (streams.length === 0) return null

  const [channels, liveStreamingDetailsList] = await Promise.all([
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])

  return (
    <>
      {streams.map(stream => {
        const channel = channels.find(
          channel => channel.basicInfo.id === stream.snippet.channelId
        )
        if (!channel) return null

        const { liveStreamingDetails } =
          liveStreamingDetailsList.find(
            liveStreamingDetails => liveStreamingDetails.id === stream.videoId
          ) || {}

        return (
          <AsideIcon
            key={stream.videoId}
            name={stream.snippet.title}
            href={`/youtube/live/${stream.videoId}`}
            src={channel.basicInfo.thumbnails['medium']?.url ?? ''}
            content={
              <Content
                channelTitle={channel.basicInfo.title}
                streamTitle={stream.snippet.title}
                viewers={Number(liveStreamingDetails?.concurrentViewers ?? 0)}
              />
            }
            roundedFull
          />
        )
      })}
    </>
  )
}

function Content(params: {
  channelTitle: string
  streamTitle: string
  viewers: number
}) {
  return (
    <section className="flex flex-col gap-y-0.5">
      <div className="text-secondary-foreground text-xs">
        {params.channelTitle}
      </div>
      <div>{params.streamTitle}</div>
      <div className="flex gap-0.5">
        <LiveBadge />
        <Separator orientation="vertical" />
        <span className="text-muted-foreground">
          <Watching count={params.viewers} compact />
        </span>
      </div>
    </section>
  )
}
