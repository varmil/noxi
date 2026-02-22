import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Separator } from '@/components/ui/separator'
import {
  getHyperChatsCount,
  getHyperChatsSumLikeCount
} from 'apis/hyper-chats/getHyperChats'
import CountMotion from 'components/styles/number/CountMotion'
import { Link } from 'lib/navigation'

type Props = {
  channelId: string
  group: string
}

export async function HyperChatStats({ channelId, group }: Props) {
  const [t, postCount, totalLikes] = await Promise.all([
    getTranslations('Features.hyperChat.stats'),
    getHyperChatsCount(channelId),
    getHyperChatsSumLikeCount(channelId)
  ])

  return (
    <Link
      href={`/${group}/channels/${channelId}/hyper-chat/poster-ranking`}
      className="flex gap-5 hover:opacity-80 transition-opacity"
      prefetch={false}
    >
      {/* Post Count */}
      <div className="flex flex-col items-center gap-1 min-w-[50px]">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {/* <MessageSquare className="size-3.5" /> */}
          <span className="text-[11px] leading-none">{t('postCount')}</span>
        </div>
        <div className="text-lg font-semibold leading-none text-center">
          <CountMotion value={postCount} />
          <span className="ml-1 text-xs font-normal">{t('postSuffix')}</span>
        </div>
      </div>

      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-7 my-auto"
      />

      {/* Total Likes */}
      <div className="flex flex-col items-center gap-1 min-w-[50px]">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {/* <Heart className="size-3.5" /> */}
          <span className="text-[11px] leading-none">{t('totalLikes')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-lg font-semibold leading-none text-center">
            <CountMotion value={totalLikes} />
            <span className="ml-1 text-xs font-normal">{t('likesSuffix')}</span>
          </div>
          {/* {postCount > 0 && <ChevronRight className="size-3.5" />} */}
        </div>
      </div>

      {/* View Ranking */}
      {postCount > 0 && (
        <div className="flex items-center gap-1">
          <ChevronRight className="size-3.5" />
        </div>
      )}
    </Link>
  )
}
