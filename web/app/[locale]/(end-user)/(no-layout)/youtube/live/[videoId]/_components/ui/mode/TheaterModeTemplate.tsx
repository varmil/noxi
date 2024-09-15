import { MessageSquare, Users } from 'lucide-react'
import { getStream } from 'apis/youtube/getStream'
import {
  Theater,
  TheaterContent,
  ResizeHandle
} from '../../layouts/theater/Theater'
import MinimizeButton from '../button/MinimizeButton'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'
import {
  TheaterBottomBarIcon as BottomBarIcon,
  TheaterBottomBar as BottomBar
} from '../theater/BottomBar'

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
    <Theater direction="horizontal">
      <TheaterContent order={1} className="flex flex-col">
        {/* Stream */}
        <section className="flex-1 w-full h-full justify-center items-center bg-black">
          <EmbedStream videoId={videoId} className="h-full w-full" />
        </section>

        {/* Bottom Bar */}
        <BottomBar>
          <div className="flex items-center gap-x-2">
            <BottomBarIcon Icon={Users} />
            <span>
              {peakConcurrentViewers
                ? peakConcurrentViewers.toLocaleString()
                : '--'}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <BottomBarIcon Icon={MessageSquare} />
            <span>{chatMessages ? chatMessages.toLocaleString() : '--'}</span>
          </div>
          <div className="flex-1" />
          <BottomBarIcon Icon={MinimizeButton} />
        </BottomBar>
      </TheaterContent>

      <ResizeHandle />

      {/* Chat */}
      <TheaterContent order={2} defaultSize={29} className="flex flex-col">
        <div className="flex-1">
          <EmbedLiveChat videoId={videoId} className="rounded-none" />
        </div>
      </TheaterContent>
    </Theater>
  )
}
