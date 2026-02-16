'use client'

import { useFormatter, useNow, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import {
  TIER_BG_COLORS,
  TIER_BORDER_LEFT_COLORS,
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from '../tier-styles'
import { HyperChatLikeButton } from './HyperChatLikeButton'
import { HyperChatMessage } from './HyperChatMessage'

interface Props {
  hyperChat: HyperChatSchema
  isLiked?: boolean
  className?: string
}

export function HyperChatCard({
  hyperChat,
  isLiked = false,
  className
}: Props) {
  const format = useFormatter()
  const now = useNow({ updateInterval: 60000 })
  const t = useTranslations('Features.hyperChat')
  const tier = hyperChat.tier
  const isFreeTier = tier === 'free'
  const displayName = hyperChat.isAnonymous
    ? t('anonymous.displayName')
    : hyperChat.author.name || ''
  const amountDisplay =
    hyperChat.amount === 0
      ? t('card.freeTicket')
      : `￥${hyperChat.amount.toLocaleString()}`

  return (
    <div
      className={cn(
        'rounded-lg px-1 py-3 min-h-[56px]',
        !isFreeTier && [
          'px-4 border-l-4',
          TIER_BG_COLORS[tier],
          TIER_BORDER_LEFT_COLORS[tier]
        ],
        className
      )}
      data-testid="hyper-chat-card"
    >
      {/* ヘッダー: アイコン + 表示名 + 金額 + 相対日時 */}
      <div className="text-sm mb-2 flex items-center gap-2">
        <Avatar className="size-7 shrink-0">
          {!hyperChat.isAnonymous && (
            <AvatarImage
              src={hyperChat.author.image || undefined}
              alt={displayName}
            />
          )}
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
        <span className={cn('font-medium text-nowrap', TIER_TEXT_COLORS[tier])}>
          {amountDisplay}
        </span>
        <span className={cn('shrink-0', TIER_TEXT_MUTED_COLORS[tier])}>
          {format.relativeTime(hyperChat.createdAt, now)}
        </span>
      </div>

      {/* メッセージ */}
      <HyperChatMessage tier={tier} message={hyperChat.message} />

      {/* いいねボタン */}
      <div className="mt-3">
        <HyperChatLikeButton
          hyperChatId={hyperChat.id}
          channelId={hyperChat.channelId}
          tier={tier}
          likeCount={hyperChat.likeCount}
          isLiked={isLiked}
        />
      </div>
    </div>
  )
}
