import { PropsWithoutRef } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import LgContainer from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/layouts/LgContainer'
import PadSection from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/layouts/PadSection'
import EmbedLiveChat from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/ui/EmbedLiveChat'
import EmbedStream from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/ui/EmbedStream'
import RelatedVideos from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/ui/RelatedVideos'
import StreamBasicInfo from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/ui/StreamBasicInfo'

type Props = {
  stream: StreamSchema
}

export default async function YoutubeLiveTemplate({
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
        <div className="flex order-1 aspect-video w-full max-h-[94svh] justify-center items-center bg-black">
          <EmbedStream videoId={videoId} className="h-full max-h-[94svh]" />
        </div>

        {/* タイトル、投稿者情報 */}
        <PadSection left className="order-3">
          <StreamBasicInfo stream={stream} />
        </PadSection>
      </LgContainer>

      <LgContainer className="space-y-4">
        {/* Chat */}
        <PadSection right className="order-2">
          <section className="min-h-80 h-[calc(100svh-24rem)] lg:h-[calc(100svh-10rem)]">
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
