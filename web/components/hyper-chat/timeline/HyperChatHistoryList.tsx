import { MessageCircleOff } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
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

  return (
    <div className="grid gap-3" data-testid="hyper-chat-history-list">
      {hyperChats.map(hyperChat => (
        <HyperChatCard key={hyperChat.id} hyperChat={hyperChat} />
      ))}
    </div>
  )
}
