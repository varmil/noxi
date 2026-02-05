import { MessageCircleOff } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getLikedHyperChatIds } from 'apis/hyper-chat-likes'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { auth } from 'lib/auth'
import { HyperChatCard } from './HyperChatCard'

interface Props {
  hyperChats: HyperChatSchema[]
}

export async function HyperChatHistoryList({ hyperChats }: Props) {
  const t = await getTranslations('Features.hyperChat.timeline')

  if (hyperChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MessageCircleOff className="mb-4 h-12 w-12" />
        <p>{t('empty')}</p>
      </div>
    )
  }

  // いいね状態を取得
  const session = await auth()
  const likedIds = session
    ? await getLikedHyperChatIds(hyperChats.map(h => h.id))
    : new Set<number>()

  return (
    <div className="grid gap-3" data-testid="hyper-chat-history-list">
      {hyperChats.map(hyperChat => (
        <HyperChatCard
          key={hyperChat.id}
          hyperChat={hyperChat}
          isLiked={likedIds.has(hyperChat.id)}
        />
      ))}
    </div>
  )
}
