'use client'

import { ArrowRight } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mode } from 'hooks/hyper-chat/useHyperChatFlow'

type Props = {
  channelTitle: string
  channelThumbnailUrl: string | null
  totalAmount: number | null
  price: number
  mode: Mode
}

export function PostTarget({
  channelTitle,
  channelThumbnailUrl,
  totalAmount,
  price,
  mode
}: Props) {
  const t = useTranslations('Features.hyperChat.dialog.postTarget')
  const format = useFormatter()

  const showAmountChange = mode === 'paid' && totalAmount !== null && price > 0

  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8 shrink-0">
        <AvatarImage
          src={channelThumbnailUrl ?? undefined}
          alt={channelTitle}
        />
        <AvatarFallback className="text-xs">
          {channelTitle.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="text-sm truncate">{channelTitle}</p>
        {showAmountChange && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>
              {t('currentAmount')}: ¥{format.number(totalAmount)}
            </span>
            <ArrowRight className="size-3 shrink-0" />
            <span className="text-foreground font-medium">
              {t('afterAmount')}: ¥{format.number(totalAmount + price)}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
