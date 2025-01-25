import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'

type Props = { videoId: string }

export async function LiveIdSuperChatTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <SuperChatContent stream={stream} />
}

/** SuperChat: Hide when scheduled */
async function SuperChatContent({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const { videoId, status } = stream
  if (status === 'scheduled') return null

  return <SuperChatGallery videoId={videoId} />
}
