import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import {
  LiveTabs,
  LiveTabsList,
  LiveTabsSuperChatContent,
  LiveTabsCommentsContent,
  LiveTabsOverviewContent
} from '../ui/tabs/LiveTabs'

type Props = { videoId: string }

export async function YoutubeLiveIdTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)

  return (
    <LiveTabs>
      <LiveTabsList stream={stream} />
      <LiveTabsSuperChatContent stream={stream} />
      <LiveTabsCommentsContent stream={stream} />
      <LiveTabsOverviewContent className="space-y-6" stream={stream} />
    </LiveTabs>
  )
}
