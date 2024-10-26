'use client'

import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'lib/navigation'

export default function AutoRouterRefresh({
  intervalMs,
  children
}: PropsWithChildren<{ intervalMs: number }>) {
  const router = useRouter()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startInterval = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        router.refresh()
      }, intervalMs)
    }
  }, [intervalMs, router])

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // ページがアクティブになったら再開。ページが非アクティブになったら中断
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startInterval()
      } else {
        stopInterval()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 初期表示時にインターバルを開始
    startInterval()

    return () => {
      stopInterval()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [router, intervalMs, startInterval, stopInterval])

  return <>{children}</>
}
