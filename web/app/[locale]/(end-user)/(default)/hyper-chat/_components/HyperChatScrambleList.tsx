import { MessagesSquare, Search, Trophy } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getLikedHyperChatIds } from 'apis/hyper-chat-likes'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { ScrambleHyperChatCard } from 'components/hyper-chat/scramble/ScrambleHyperChatCard'
import { auth } from 'lib/auth'
import { Link } from 'lib/navigation'

interface Props {
  hyperChats: HyperChatSchema[]
  channelMap: Map<string, ChannelSchema>
}

export async function HyperChatScrambleList({ hyperChats, channelMap }: Props) {
  const t = await getTranslations('Features.hyperChat.timeline')

  if (hyperChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4">
          <MessagesSquare className="size-8 text-muted-foreground" />
        </div>
        <p className="mt-4 font-medium text-foreground/80">{t('empty')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('emptyHint')}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button asChild variant="outline">
            <Link href="/ranking/super-chat/channels/all/last24Hours">
              <Trophy className="size-3.5" />
              {t('findFromRanking')}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/groups">
              <Search className="size-3.5" />
              {t('findBySearch')}
            </Link>
          </Button>
        </div>
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
          currentUserId={
            session?.user?.id ? Number(session.user.id) : undefined
          }
          channel={channelMap.get(hyperChat.channelId)}
        />
      ))}
    </div>
  )
}
