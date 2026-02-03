'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = PropsWithChildren<{
  /** スクロール量のしきい値（px） */
  threshold?: number
}>

/** スクロールで表示される固定フッター */
export function ScrollRevealFooter({ children, threshold = 200 }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    // 初期状態をチェック
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return (
    <div
      className={cn(
        'fixed bottom-16.5 left-0 right-0 z-40 bg-background border-t py-4 px-8 lg:hidden',
        'transition-all duration-300',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      )}
    >
      {children}
    </div>
  )
}
