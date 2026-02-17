import { MessagesSquare } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getLikedHyperChatIds } from 'apis/hyper-chat-likes'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { ScrambleHyperChatCard } from 'components/hyper-chat/scramble/ScrambleHyperChatCard'
import { auth } from 'lib/auth'

interface Props {
  hyperChats: HyperChatSchema[]
  channelMap: Map<string, ChannelSchema>
}

export async function HyperChatScrambleList({ hyperChats, channelMap }: Props) {
  const t = await getTranslations('Features.hyperChat.timeline')

  if (hyperChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MessagesSquare className="mb-4 h-12 w-12" />
        <p>{t('empty')}</p>
      </div>
    )
  }

  const session = await auth()
  const likedIds = session
    ? await getLikedHyperChatIds(hyperChats.map(h => h.id))
    : new Set<number>()

  return (
    <div className="grid gap-10">
      {hyperChats.map(hyperChat => (
        <ScrambleHyperChatCard
          key={hyperChat.id}
          hyperChat={hyperChat}
          isLiked={likedIds.has(hyperChat.id)}
          channel={channelMap.get(hyperChat.channelId)}
        />
      ))}
    </div>
  )
}
