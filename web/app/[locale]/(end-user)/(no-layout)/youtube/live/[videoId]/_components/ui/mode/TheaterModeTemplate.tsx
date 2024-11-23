import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getStream } from 'apis/youtube/getStream'
import Watching from 'components/styles/number/Watching'
import {
  Theater,
  TheaterContent,
  ResizeHandle
} from '../../layouts/theater/Theater'
import MinimizeButton from '../button/MinimizeButton'
import Rotate180Button from '../button/Rotate180Button'
import EmbedLiveChat from '../stream/EmbedLiveChat'
import EmbedStream from '../stream/EmbedStream'
import {
  TheaterBottomBarIcon as BottomBarIcon,
  TheaterBottomBar as BottomBar,
  BOTTOM_BAR_HEIGHT
} from '../theater/BottomBar'

type Props = {
  videoId: string
}

export default async function TheaterModeTemplate({ videoId }: Props) {
  const [stream, [{ liveStreamingDetails } = {}]] = await Promise.all([
    getStream(videoId),
    getLiveStreamingDetails({ videoIds: [videoId] })
  ])

  const {
    snippet: { thumbnails }
  } = stream
  const { concurrentViewers } = liveStreamingDetails || {}
  const isLive = stream.status === 'live'

  return (
    <Theater direction="horizontal">
      <TheaterContent order={1} className="flex flex-col">
        {/* Stream */}
        <section className="flex-1 w-full h-full bg-black">
          <EmbedStream
            videoId={videoId}
            img={thumbnails.maxres?.url}
            // BottomBarの高さをマイナスする
            style={`max-height:calc(100vmin - ${BOTTOM_BAR_HEIGHT});`}
          />
        </section>

        {/* Bottom Bar */}
        <BottomBar>
          {isLive && (
            <div className="">
              <span>
                <Watching count={concurrentViewers} />
              </span>
            </div>
          )}
          {/* <div className="flex items-center gap-x-2">
            <BottomBarIcon Icon={MessageSquare} />
            <span>{chatMessages ? chatMessages.toLocaleString() : '--'}</span>
          </div> */}
          <div className="flex-1" />
          <BottomBarIcon className="sm:hidden" Icon={Rotate180Button} />
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
