'use client'

import { useFormatter, useNow } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { HyperChatMessage } from 'components/hyper-chat/HyperChatMessage'
import {
  TIER_BG_COLORS,
  TIER_BORDER_LEFT_COLORS,
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from 'components/hyper-chat/tier-styles'

interface Props {
  hyperChat: HyperChatSchema
  className?: string
}

export function HyperChatCard({ hyperChat, className }: Props) {
  const format = useFormatter()
  const now = useNow({ updateInterval: 60000 })
  const tier = hyperChat.tier
  const displayName = hyperChat.author.name || '匿名さん'

  return (
    <div
      className={cn(
        'rounded-lg border-l-4 px-3 py-2 min-h-[56px]',
        TIER_BG_COLORS[tier],
        TIER_BORDER_LEFT_COLORS[tier],
        className
      )}
      data-testid="hyper-chat-card"
    >
      {/* ヘッダー: アイコン + 表示名 + 金額 + 相対日時 */}
      <div className="text-sm mb-2 flex items-center gap-2">
        <Avatar className="size-7 shrink-0">
          <AvatarImage
            src={hyperChat.author.image || undefined}
            alt={displayName}
          />
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'line-clamp-1 break-all font-medium',
            TIER_TEXT_MUTED_COLORS[tier]
          )}
        >
          {displayName}
        </span>
        <span className={cn('font-medium', TIER_TEXT_COLORS[tier])}>
          ￥{hyperChat.amount.toLocaleString()}
        </span>
        <span className={cn('shrink-0', TIER_TEXT_MUTED_COLORS[tier])}>
          {format.relativeTime(hyperChat.createdAt, now)}
        </span>
      </div>

      {/* メッセージ */}
      <HyperChatMessage tier={tier} message={hyperChat.message} />
    </div>
  )
}
