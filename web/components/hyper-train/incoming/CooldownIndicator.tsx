'use client'

import { useCallback, useRef, useSyncExternalStore } from 'react'
import { Timer } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  cooldownEndsAt: string
}

function useCountdown(endsAt: string): number | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const interval = setInterval(onStoreChange, 1000)
      return () => clearInterval(interval)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endsAt]
  )

  const cachedRef = useRef<number>(0)

  const getSnapshot = useCallback(() => {
    const remaining = new Date(endsAt).getTime() - Date.now()
    const rounded = Math.floor(remaining / 1000) * 1000
    if (rounded !== cachedRef.current) {
      cachedRef.current = rounded
    }
    return cachedRef.current
  }, [endsAt])

  const getServerSnapshot = useCallback(() => null, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function formatMinutesSeconds(ms: number): string {
  if (ms <= 0) return '0:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function CooldownIndicator({ cooldownEndsAt }: Props) {
  const t = useTranslations('Features.hyperTrain.incoming')
  const timeLeft = useCountdown(cooldownEndsAt)

  if (timeLeft === null) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
        <Timer className="size-4 text-muted-foreground" />
        <Skeleton className="h-4 w-41" />
      </div>
    )
  }

  if (timeLeft <= 0) return null

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
      <Timer className="size-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">
        {t('cooldown', { time: formatMinutesSeconds(timeLeft) })}
      </span>
    </div>
  )
}
