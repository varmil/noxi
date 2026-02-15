'use client'

import { useRef, useState } from 'react'
import { Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import {
  PaidTierValue,
  TIER_CONFIG,
  TierValue
} from 'apis/hyper-chats/hyperChatSchema'
import {
  TIER_ACCENT_TEXT_COLORS,
  TIER_BG_COLORS,
  TIER_DOT_COLORS,
  TIER_RING_COLORS,
  TIER_TEXT_COLORS,
  TIER_TEXT_MUTED_COLORS
} from '../tier-styles'

type TierOption = {
  id: TierValue
  price: number
  maxChars: number
}

type Props = {
  selectedTier: PaidTierValue
  onTierChange: (tier: PaidTierValue) => void
  onSelectFree: () => void
  hasTicket: boolean
  ticketCount: number
  isTicketMode: boolean
}

export function TierSlider({
  selectedTier,
  onTierChange,
  onSelectFree,
  hasTicket,
  ticketCount,
  isTicketMode
}: Props) {
  const t = useTranslations('Features.hyperChat')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const paidTiers: TierOption[] = [
    {
      id: 'lite',
      price: TIER_CONFIG.lite.price,
      maxChars: TIER_CONFIG.lite.maxChars
    },
    {
      id: 'standard',
      price: TIER_CONFIG.standard.price,
      maxChars: TIER_CONFIG.standard.maxChars
    },
    {
      id: 'premium',
      price: TIER_CONFIG.premium.price,
      maxChars: TIER_CONFIG.premium.maxChars
    },
    {
      id: 'special',
      price: TIER_CONFIG.special.price,
      maxChars: TIER_CONFIG.special.maxChars
    }
  ]

  const allTiers: TierOption[] = hasTicket
    ? [
        { id: 'free', price: 0, maxChars: TIER_CONFIG.free.maxChars },
        ...paidTiers
      ]
    : paidTiers

  const currentIndex = allTiers.findIndex(
    tier =>
      (isTicketMode && tier.id === 'free') ||
      (!isTicketMode && tier.id === selectedTier)
  )
  const activeTier = isTicketMode ? 'free' : selectedTier
  const activeConfig = allTiers[currentIndex] || allTiers[0]

  const handleTierClick = (tier: TierOption) => {
    if (tier.id === 'free') {
      onSelectFree()
    } else {
      onTierChange(tier.id as PaidTierValue)
    }
  }

  const getPositionFromIndex = (index: number) => {
    return (index / (allTiers.length - 1)) * 100
  }

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const index = Math.round((percentage / 100) * (allTiers.length - 1))
    const tier = allTiers[index]

    if (tier.id === 'free') {
      onSelectFree()
    } else {
      onTierChange(tier.id as PaidTierValue)
    }
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDrag(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDrag(e.touches[0].clientX)
  }

  return (
    <div className="space-y-4">
      {/* Selected tier info */}
      <div
        className={cn(
          'rounded-lg p-4 transition-colors duration-300',
          TIER_BG_COLORS[activeTier],
          TIER_TEXT_COLORS[activeTier] || 'text-foreground'
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeTier === 'free' && <Tickets className="size-5" />}
            <div>
              <div className="font-bold text-lg">
                {t(`dialog.tier.${activeTier}`)}
              </div>
              <div
                className={`text-xs ${TIER_TEXT_MUTED_COLORS[activeTier]} space-y-0.5 mt-1`}
              >
                {(t.raw(`dialog.tierFeatures.${activeTier}`) as string[]).map(
                  (feature, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <span className="text-xs">✓</span>
                      <span>{feature}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold">
            {activeTier === 'free' ? (
              <span className="flex items-center gap-1">
                {ticketCount} → {ticketCount - 1}
                <span className="self-end text-sm">
                  {t('dialog.ticketLeft')}
                </span>
              </span>
            ) : (
              t('dialog.price', { price: activeConfig.price.toLocaleString() })
            )}
          </div>
        </div>
      </div>

      {/* Slider track */}
      <div
        ref={containerRef}
        className="relative h-14 select-none touch-none mx-3"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full bg-muted overflow-hidden">
          {/* Full gradient background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: hasTicket
                ? 'linear-gradient(to right, #22c55e, #06b6d4, #eab308, #fb923c, #dc2626)'
                : 'linear-gradient(to right, #06b6d4, #eab308, #fb923c, #dc2626)'
            }}
          />
          {/* Unfilled overlay */}
          <div
            className="absolute top-0 bottom-0 right-0 bg-muted transition-all duration-300 ease-out"
            style={{
              left: `${getPositionFromIndex(currentIndex)}%`
            }}
          />
        </div>

        {/* Tier markers */}
        {allTiers.map((tier, index) => {
          const position = getPositionFromIndex(index)
          const isActive = index === currentIndex

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => handleTierClick(tier)}
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
                'flex flex-col items-center gap-1'
              )}
              style={{ left: `${position}%` }}
            >
              {/* Marker dot */}
              <div
                className={cn(
                  'rounded-full transition-all duration-300 border-2 border-background shadow-md',
                  TIER_DOT_COLORS[tier.id],
                  isActive
                    ? 'size-6 ring-2 ring-offset-2 ring-offset-background'
                    : 'size-4',
                  isActive && TIER_RING_COLORS[tier.id]
                )}
                onMouseDown={isActive ? handleMouseDown : undefined}
                onTouchStart={isActive ? handleMouseDown : undefined}
              />

              {/* Label */}
              <span
                className={cn(
                  'text-xs font-medium transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? TIER_ACCENT_TEXT_COLORS[tier.id]
                    : 'text-muted-foreground',
                  isActive && 'font-bold'
                )}
              >
                {tier.id === 'free' ? (
                  <span className="flex items-center gap-0.5">
                    <Tickets className="size-3" />
                  </span>
                ) : (
                  `¥${tier.price.toLocaleString()}`
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
