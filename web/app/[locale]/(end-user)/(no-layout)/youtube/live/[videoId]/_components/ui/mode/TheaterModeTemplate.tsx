import { PropsWithChildren } from 'react'
import { MessageSquare, Users } from 'lucide-react'
import { getStream } from 'apis/youtube/getStream'
import MinimizeButton from '../button/MinimizeButton'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'

type Props = {
  videoId: string
}

export default async function TheaterModeTemplate({ videoId }: Props) {
  const stream = await getStream(videoId)
  const {
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    }
  } = stream

  return (
    <RotateContainer>
      <div className="flex-1 flex flex-col">
        {/* Stream */}
        <section className="flex-1 w-full h-full justify-center items-center bg-black">
          <EmbedStream videoId={videoId} className="h-full w-full" />
        </section>

        {/* Bottom Bar */}
        <div className="h-[11vh] min-h-9 max-h-16 bg-secondary flex items-center px-4 space-x-6">
          <div className="flex gap-x-2">
            <Users className="h-6 w-6" />
            <span>
              {peakConcurrentViewers
                ? peakConcurrentViewers.toLocaleString()
                : '--'}
            </span>
          </div>
          <div className="flex gap-x-2">
            <MessageSquare className="h-6 w-6" />
            <span>{chatMessages ? chatMessages.toLocaleString() : '--'}</span>
          </div>
          <div className="flex-1" />
          <MinimizeButton />
        </div>
      </div>

      {/* Chat */}
      <section className="w-80 flex flex-col">
        <div className="flex-1">
          <EmbedLiveChat videoId={videoId} />
        </div>
      </section>
    </RotateContainer>
  )
}

/** XS(smartphone) でのみロテートしたい */
function RotateContainer({ children }: PropsWithChildren) {
  // TODO: sm以上での最適化
  const pClass = 'w-screen h-screen overflow-hidden'
  const cClassName = `flex \
    rotate-90 mt-[calc((100vh-100vw)/2)] -ml-[calc((100vh-100vw)/2)] w-[100vh] h-[100vw] \
    sm:transform-none sm:h-screen`

  return (
    <section className={pClass}>
      <div className={cClassName}>{children}</div>
    </section>
  )
}
