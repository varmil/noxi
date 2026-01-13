'use client'

import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'lib/navigation'

interface Props {
  /** 広告の一意識別子 */
  adId: string
  /** 広告の種類 */
  adType: AdType
  children: ReactNode
}

/**
 * 広告カードをラップしてインプレッション・クリックをトラッキングする
 * - インプレッション: ビューポートに50%以上表示されたとき（URL 単位で1回）
 * - クリック: カード内のクリック時
 *
 * URL（pathname + クエリストリング）が変わるたびに新しいインプレッションとしてカウント
 */
export function TrackableAdCard({ adId, adType, children }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentUrl = `${pathname}?${searchParams.toString()}`
  const trackedUrl = useRef<string | null>(null)

  const trackImpression = useCallback(() => {
    // ref のアクセスは callback 内で行う（レンダー中にアクセスしない）
    if (trackedUrl.current === currentUrl) return
    trackedUrl.current = currentUrl
    window.dataLayer?.push({
      event: 'ad_impression',
      ad_id: adId,
      ad_type: adType
    })
  }, [currentUrl, adId, adType])

  const handleClick = useCallback(() => {
    window.dataLayer?.push({
      event: 'ad_click',
      ad_id: adId,
      ad_type: adType
    })
  }, [adId, adType])

  return (
    <div onClick={handleClick}>
      <TrackableAdCardImpression onImpression={trackImpression}>
        {children}
      </TrackableAdCardImpression>
    </div>
  )
}

interface ImpressionProps {
  onImpression: () => void
  children: ReactNode
}

/**
 * Intersection Observer でインプレッションを検知する内部コンポーネント
 */
function TrackableAdCardImpression({ onImpression, children }: ImpressionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onImpression()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [onImpression])

  return <div ref={ref}>{children}</div>
}
