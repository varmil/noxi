import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import RelatedVideos from '../../_components/ui/related-videos/RelatedVideos'

type Props = { videoId: string }

export async function LiveIdRelatedVideosTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <Content stream={stream} />
}

async function Content({ stream }: { stream: StreamSchema }) {
  const {
    snippet: { channelId }
  } = stream

  return <RelatedVideos type="ended" channelId={channelId} />
}
