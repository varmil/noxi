'use client'

import { useFormatter, useNow, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { Link } from 'lib/navigation'
import {
  TIER_BG_COLORS,
  TIER_BORDER_LEFT_COLORS,
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from '../tier-styles'
import { HyperChatCardMenu } from './HyperChatCardMenu'
import { HyperChatLikeButton } from './HyperChatLikeButton'
import { HyperChatMessage } from './HyperChatMessage'

interface Props {
  hyperChat: HyperChatSchema
  isLiked?: boolean
  currentUserId?: number
  className?: string
}

const AvatarContainer = ({
  displayName,
  src,
  isAnonymous
}: {
  displayName: string
  src?: string | null
  isAnonymous?: boolean
}) => {
  return (
    <Avatar className="size-6 shrink-0">
      {!isAnonymous && <AvatarImage src={src || undefined} alt={displayName} />}
      <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

const DisplayName = ({
  displayName,
  tier,
  isAnonymous
}: {
  displayName: string
  tier: string
  isAnonymous?: boolean
}) => {
  return (
    <span
      className={cn(
        'line-clamp-1 break-all font-medium',
        TIER_TEXT_MUTED_COLORS[tier],
        !isAnonymous && 'hover:underline'
      )}
    >
      {displayName}
    </span>
  )
}

export function HyperChatCard({
  hyperChat,
  isLiked = false,
  currentUserId,
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
        'rounded-lg px-1 py-3 min-h-[56px] flex gap-2',
        !isFreeTier && [
          'pl-3 pr-4 border-l-4',
          TIER_BG_COLORS[tier],
          TIER_BORDER_LEFT_COLORS[tier]
        ],
        className
      )}
      data-testid="hyper-chat-card"
    >
      {/* アバター */}
      <div className="shrink-0 pt-0.5">
        {!hyperChat.isAnonymous && hyperChat.author.username ? (
          <Link href={`/users/${hyperChat.author.username}`} prefetch={false}>
            <AvatarContainer
              displayName={displayName}
              src={hyperChat.author.image}
              isAnonymous={hyperChat.isAnonymous}
            />
          </Link>
        ) : (
          <AvatarContainer
            displayName={displayName}
            src={null}
            isAnonymous={hyperChat.isAnonymous}
          />
        )}
      </div>

      {/* 右側: ヘッダー + 本文 + いいね */}
      <div className="min-w-0 flex-1">
        {/* ヘッダー: 表示名 + 金額 + 相対日時 */}
        <div className="text-sm mb-1 flex items-center gap-2">
          {!hyperChat.isAnonymous && hyperChat.author.username ? (
            <Link
              href={`/users/${hyperChat.author.username}`}
              className="min-w-0"
              prefetch={false}
            >
              <DisplayName
                displayName={displayName}
                tier={tier}
                isAnonymous={hyperChat.isAnonymous}
              />
            </Link>
          ) : (
            <DisplayName
              displayName={displayName}
              tier={tier}
              isAnonymous={hyperChat.isAnonymous}
            />
          )}
          <span
            className={cn('font-medium text-nowrap', TIER_TEXT_COLORS[tier])}
          >
            {amountDisplay}
          </span>
          <span className={cn('shrink-0', TIER_TEXT_MUTED_COLORS[tier])}>
            {format.relativeTime(hyperChat.createdAt, now)}
          </span>

          {currentUserId === hyperChat.userId && (
            <HyperChatCardMenu
              hyperChatId={hyperChat.id}
              channelId={hyperChat.channelId}
              className="ml-auto"
            />
          )}
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
    </div>
  )
}
