import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'

type Props = { videoId: string }

export async function LiveIdSuperChatCommentsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <SuperChatComments stream={stream} />
}

/** SuperChat: Hide when scheduled */
async function SuperChatComments({ stream }: { stream: StreamSchema }) {
  const { videoId, status } = stream
  if (status === 'scheduled') return null

  return <SuperChatGallery videoId={videoId} />
}
