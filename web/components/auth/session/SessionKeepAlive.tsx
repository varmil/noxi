'use client'

import { memo, useCallback, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

// タブがアクティブになってから5秒経ったら更新
const INTERVAL = 5 * 1000

/**
 * Auth.js v5 のバグの回避
 *
 * jwt callback内でreturnした値がCookieに反映されない
 * これを強制的に更新するコンポーネント
 */
export const SessionKeepAlive = memo(function SessionKeepAlive() {
  const { update } = useSession()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const updateRef = useRef(update) // updateが毎回変わってしまうのでworkaround

  const startTimeout = useCallback(() => {
    if (timeoutRef.current === null) {
      timeoutRef.current = setTimeout(() => {
        if (document.visibilityState === 'visible') {
          console.log('update session')
          updateRef.current()
        }
      }, INTERVAL)
    }
  }, [])

  const stopTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      startTimeout()
    } else {
      stopTimeout()
    }
  }, [startTimeout, stopTimeout])

  useEffect(() => {
    updateRef.current = update
  }, [update])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 初期起動
    if (document.visibilityState === 'visible') {
      startTimeout()
    }
    return () => {
      stopTimeout()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange, startTimeout, stopTimeout])

  return null
})
