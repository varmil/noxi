'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { likeHyperChat, unlikeHyperChat } from 'apis/hyper-chat-likes'
import { TierValue } from 'apis/hyper-chats/hyperChatSchema'
import AuthModal from 'components/auth/dialog/AuthModal'
import { TIER_TEXT_COLORS, TIER_TEXT_MUTED_COLORS } from '../tier-styles'

type Props = {
  hyperChatId: number
  channelId: string
  tier: TierValue
  likeCount: number
  isLiked: boolean
  className?: string
}

export function HyperChatLikeButton({
  hyperChatId,
  channelId,
  tier,
  likeCount,
  isLiked: initialIsLiked,
  className
}: Props) {
  const { data: session } = useSession()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(initialIsLiked)
  const [optimisticCount, setOptimisticCount] = useState(likeCount)

  const handleClick = () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }

    // Optimistic UI update
    const newIsLiked = !optimisticIsLiked
    setOptimisticIsLiked(newIsLiked)
    setOptimisticCount(prev => (newIsLiked ? prev + 1 : prev - 1))

    startTransition(async () => {
      try {
        if (newIsLiked) {
          await likeHyperChat(hyperChatId, channelId)
        } else {
          await unlikeHyperChat(hyperChatId, channelId)
        }
      } catch {
        // Rollback on error
        setOptimisticIsLiked(!newIsLiked)
        setOptimisticCount(prev => (newIsLiked ? prev - 1 : prev + 1))
      }
    })
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          'flex items-center gap-1.5 text-sm transition-colors cursor-pointer',
          optimisticIsLiked
            ? TIER_TEXT_COLORS[tier]
            : `${TIER_TEXT_MUTED_COLORS[tier]} hover:scale-110`,
          isPending && 'opacity-70',
          className
        )}
      >
        <Heart className={cn('size-4', optimisticIsLiked && 'fill-current')} />
        {optimisticCount > 0 && <span>{optimisticCount.toLocaleString()}</span>}
      </button>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
