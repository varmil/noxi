import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import LgContainer from '../../layouts/default/LgContainer'
import PadSection from '../../layouts/default/PadSection'
import MaximizeButton from '../button/MaximizeButton'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'
import RelatedVideos from '../stream/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'

type Props = {
  videoId: string
}

export default async function DefaultModeTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  const {
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream

  return (
    <div className="grid lg:gap-x-0 grid-cols-1 lg:grid-cols-[minmax(710px,100%),minmax(300px,380px)]">
      <LgContainer className="space-y-4">
        {/* Stream */}
        <div className="order-1 aspect-video w-full bg-black">
          <EmbedStream videoId={videoId} className="w-full h-full" />
        </div>

        {/* タイトル、投稿者情報 */}
        <PadSection left className="order-3 space-y-4">
          <MaximizeButton />
          <StreamBasicInfo stream={stream} />
        </PadSection>
      </LgContainer>

      <LgContainer className="space-y-4">
        {/* Chat */}
        <PadSection right className="order-2">
          <section className="min-h-80 h-[calc(100vh-25rem)] lg:h-[calc(100vh-9.5rem)]">
            <EmbedLiveChat videoId={videoId} />
          </section>
        </PadSection>

        {/* Related Videos */}
        <PadSection right className="order-4">
          <RelatedVideos />
        </PadSection>
      </LgContainer>
    </div>
  )
}
