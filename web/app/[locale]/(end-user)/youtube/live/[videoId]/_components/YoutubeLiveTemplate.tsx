import { PropsWithoutRef } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import RelatedVideos from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/RelatedVideos'
import StreamBasicInfo from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/StreamBasicInfo'
import LgContainer from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/layouts/LgContainer'
import PadSection from 'app/[locale]/(end-user)/youtube/live/[videoId]/_components/layouts/PadSection'

const embed_domain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'localhost'

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

  const EMBED_QUERY = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    modestbranding: '1'
  }).toString()

  return (
    <div className="grid lg:gap-x-0 grid-cols-1 lg:grid-cols-[minmax(650px,100%),minmax(320px,1fr)]">
      <LgContainer className="space-y-4">
        {/* Stream */}
        <div className="flex order-1 aspect-video w-full max-h-[94svh] justify-center items-center bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?${EMBED_QUERY}`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video h-full max-h-[94svh]"
          ></iframe>
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
            <iframe
              src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
              allow=""
              allowFullScreen
              className="w-full h-full rounded-lg lg:rounded-none"
            ></iframe>
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
