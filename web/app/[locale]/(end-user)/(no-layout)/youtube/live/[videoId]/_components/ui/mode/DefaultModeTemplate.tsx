import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import OpenChatButton from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/button/OpenChatButton'
import {
  LeftContainer,
  RightContainer
} from '../../layouts/default/LgContainer'
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

  const colClass = ''

  return (
    <div className="grid grid-cols-1 lg:flex lg:gap-x-0">
      <LeftContainer className="lg:grid-cols-3">
        {/* Stream */}
        <section className="order-1 aspect-video w-full bg-black lg:col-span-full">
          <EmbedStream videoId={videoId} className="w-full h-full" />
        </section>

        {/* タイトル、投稿者情報 */}
        <PadSection
          left
          className="order-3 space-y-4 @xs:col-span-full @4xl:col-span-2"
        >
          <MaximizeButton />
          <StreamBasicInfo stream={stream} />
        </PadSection>

        {/* Open ChatList & Related Videos */}
        <PadSection
          right
          className="order-4 space-y-4 @xs:col-span-full @4xl:col-span-1"
        >
          <OpenChatButton />
          <RelatedVideos />
        </PadSection>
      </LeftContainer>

      <RightContainer>
        {/* Chat */}
        <PadSection className="lg:px-0 order-2">
          <section className="min-h-80 h-[calc(100vh-25rem)] lg:h-[calc(100vh-9.5rem)]">
            <EmbedLiveChat videoId={videoId} />
          </section>
        </PadSection>
      </RightContainer>
    </div>
  )
}
