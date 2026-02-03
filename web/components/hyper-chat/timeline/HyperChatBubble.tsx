'use client'

import { useFormatter, useNow } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import {
  TIER_BG_COLORS,
  TIER_BORDER_COLORS,
  TIER_BORDER_LEFT_COLORS,
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from '../tier-styles'

interface Props {
  hyperChat: HyperChatSchema
  className?: string
}

export function HyperChatBubble({ hyperChat, className }: Props) {
  const format = useFormatter()
  const now = useNow({ updateInterval: 60000 }) // 1分ごとに更新
  const tier = hyperChat.tier
  const displayName = hyperChat.author.name || '匿名さん'

  return (
    <div
      className={cn(
        // ml-auto で右寄せ
        'flex items-start gap-2 max-w-md cursor-pointer ml-auto',
        className
      )}
    >
      {/* 吹き出し */}
      <div
        className={cn(
          'relative min-w-0 flex-1 rounded-lg border px-3 py-2 min-h-[56px]',
          TIER_BG_COLORS[tier],
          TIER_BORDER_COLORS[tier]
        )}
      >
        {/* 吹き出しの三角形（右向き、Avatar側を指す） */}
        <div
          className={cn(
            'absolute -right-2 top-3 h-0 w-0',
            'border-y-[6px] border-l-[8px] border-y-transparent',
            TIER_BORDER_LEFT_COLORS[tier]
          )}
        />

        {/* ヘッダー: アイコン + 表示名 + 金額 + 相対日時 */}
        <div className="text-xs mb-1 flex items-center gap-2">
          <Avatar className="size-4 shrink-0">
            <AvatarImage
              src={hyperChat.author.image || undefined}
              alt={displayName}
            />
            <AvatarFallback>
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
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
        <p
          className={cn(
            'text-xs line-clamp-2 whitespace-pre-wrap',
            TIER_TEXT_COLORS[tier]
          )}
        >
          {hyperChat.message}
        </p>
      </div>

      {/* ユーザーアイコン（右側） */}
      <Avatar className="size-8 shrink-0 mt-0.5">
        <AvatarImage
          src={hyperChat.author.image || undefined}
          alt={displayName}
        />
        <AvatarFallback className="text-xs">
          {displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
