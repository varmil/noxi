'use client'

import { useTheme } from 'next-themes'
import styles from './styles.module.css'

export default function TweetThemeWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      suppressHydrationWarning
      data-theme={resolvedTheme}
      className={`columns-1 gap-4 lg:gap-8 sm:columns-2 [&>div]:mb-4 lg:[&>div]:mb-8 [&>div]:break-inside-avoid ${styles['my-class']}`}
    >
      {children}
    </div>
  )
}
