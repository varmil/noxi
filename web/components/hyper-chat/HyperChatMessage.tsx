'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import {
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from 'components/hyper-chat/tier-styles'

interface Props {
  tier: HyperChatSchema['tier']
  message: string
}

export function HyperChatMessage({ tier, message }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      )
      // scrollHeight で実際のコンテンツ高さを取得（line-clamp 適用中でも正確）
      const height = contentRef.current.scrollHeight
      setShowReadMore(height > lineHeight * 8)
    }
  }, [message])

  return (
    <>
      <p
        ref={contentRef}
        className={cn(
          `text-sm whitespace-pre-wrap ${!isExpanded ? 'line-clamp-8' : ''}`,
          TIER_TEXT_COLORS[tier]
        )}
      >
        {message}
      </p>
      {showReadMore && !isExpanded && (
        <Button
          variant="ghost"
          className={cn('p-0 font-normal', TIER_TEXT_MUTED_COLORS[tier])}
          onClick={() => setIsExpanded(true)}
        >
          さらに表示
        </Button>
      )}
    </>
  )
}
