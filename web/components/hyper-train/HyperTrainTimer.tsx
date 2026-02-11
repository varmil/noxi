'use client'

import { useCallback, useRef, useSyncExternalStore } from 'react'
import { Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  expiresAt: string
}

function formatTimeLeft(ms: number): string {
  if (ms <= 0) return '0:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function useCountdown(expiresAt: string): number | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const interval = setInterval(onStoreChange, 1000)
      return () => clearInterval(interval)
    },
    // expiresAt が変わったら再購読
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [expiresAt]
  )

  const cachedRef = useRef<number>(0)

  const getSnapshot = useCallback(() => {
    const remaining = new Date(expiresAt).getTime() - Date.now()
    // 秒単位で丸めてキャッシュし、同一秒内では同じ値を返す
    const rounded = Math.floor(remaining / 1000) * 1000
    if (rounded !== cachedRef.current) {
      cachedRef.current = rounded
    }
    return cachedRef.current
  }, [expiresAt])

  // SSR では null を返してハイドレーションミスマッチを防止
  const getServerSnapshot = useCallback(() => null, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function HyperTrainTimer({ expiresAt }: Props) {
  const timeLeft = useCountdown(expiresAt)

  // SSR / ハイドレーション中は Skeleton を表示
  if (timeLeft === null) {
    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="size-3.5" />
        <Skeleton className="h-5 w-9" />
      </div>
    )
  }

  if (timeLeft <= 0) return null

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      <span>{formatTimeLeft(timeLeft)}</span>
    </div>
  )
}
