'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'lib/navigation'

export default function AutoRouterRefresh({
  intervalMs,
  children
}: PropsWithChildren<{ intervalMs: number }>) {
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('refresh')
      router.refresh()
    }, intervalMs)
    return () => {
      console.log('clearInterval')
      clearInterval(timer)
    }
  }, [router, intervalMs])

  return <>{children}</>
}
