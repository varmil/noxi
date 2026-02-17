'use client'

import { useOptimistic, useState, useTransition } from 'react'
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
  isLiked,
  className
}: Props) {
  const { data: session } = useSession()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [optimistic, addOptimistic] = useOptimistic(
    { isLiked, count: likeCount },
    (current, newIsLiked: boolean) => ({
      isLiked: newIsLiked,
      count: newIsLiked ? current.count + 1 : current.count - 1
    })
  )

  const handleClick = () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }

    const newIsLiked = !optimistic.isLiked

    startTransition(async () => {
      addOptimistic(newIsLiked)
      if (newIsLiked) {
        await likeHyperChat(hyperChatId, channelId)
      } else {
        await unlikeHyperChat(hyperChatId, channelId)
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
          optimistic.isLiked
            ? TIER_TEXT_COLORS[tier]
            : `${TIER_TEXT_MUTED_COLORS[tier]} hover:scale-110`,
          isPending && 'opacity-70',
          className
        )}
      >
        <Heart className={cn('size-4', optimistic.isLiked && 'fill-current')} />
        {optimistic.count > 0 && (
          <span>{optimistic.count.toLocaleString()}</span>
        )}
      </button>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
