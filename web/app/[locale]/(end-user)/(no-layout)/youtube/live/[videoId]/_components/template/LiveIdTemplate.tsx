import { PropsWithoutRef } from 'react'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ChatCounts from 'features/stream-stats/chart/ChatCounts'
import GradeDisplay from '../ui/grade/GradeDisplay'
import StreamBasicInfo from '../ui/stream/StreamBasicInfo'

type Props = { videoId: string }

export async function LiveIdTemplate({ videoId }: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <Overview className="space-y-8" stream={stream} />
}

/** タイトル、投稿者情報 */
async function Overview({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const { videoId } = stream
  const [chatCounts] = await Promise.all([getChatCounts({ videoId })])

  return (
    <section className={`${className ?? ''}`}>
      <div className="lg:hidden">
        <GradeDisplay />
      </div>

      <StreamBasicInfo stream={stream} />
      <ChatCounts stream={stream} chatCounts={chatCounts} />
    </section>
  )
}
