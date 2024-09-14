import { PropsWithoutRef } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import MaximizeButton from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/button/MaximizeButton'
import LgContainer from '../../layouts/LgContainer'
import PadSection from '../../layouts/PadSection'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'
import RelatedVideos from '../stream/RelatedVideos'
import StreamBasicInfo from '../stream/StreamBasicInfo'

type Props = {
  stream: StreamSchema
}

export default async function DefaultModeTemplate({
  stream
}: PropsWithoutRef<Props>) {
  const {
    videoId,
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
    <div className="grid lg:gap-x-0 grid-cols-1 lg:grid-cols-[minmax(650px,100%),minmax(320px,1fr)]">
      <LgContainer className="space-y-4">
        {/* Stream */}
        <div className="flex order-1 aspect-video w-full max-h-[94vh] justify-center items-center bg-black">
          <EmbedStream
            videoId={videoId}
            className="w-full h-full max-h-[94vh]"
          />
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
