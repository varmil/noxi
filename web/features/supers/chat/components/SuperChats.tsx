import { PropsWithoutRef } from 'react'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'
import SuperChat from 'features/supers/chat/components/SuperChat'

type Props = PropsWithoutRef<{
  chats: SuperChatsSchema
  showStreamLink: boolean
}>

export default async function SuperChats({ chats, showStreamLink }: Props) {
  let streams: StreamsSchema | undefined
  if (showStreamLink && chats.length > 0) {
    streams = await getStreams({
      videoIds: chats.map(chat => chat.videoId),
      limit: chats.length
    })
  }

  return (
    <>
      {chats.map(chat => (
        <SuperChat
          key={chat.id}
          chat={chat}
          stream={streams?.find(s => s.videoId === chat.videoId)}
        />
      ))}
    </>
  )
}
