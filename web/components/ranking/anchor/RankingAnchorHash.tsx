'use client'

import { PropsWithChildren, useEffect } from 'react'

/**
 * rank-{#id} にハッシュがあった場合、対象の要素をハイライト
 * {#id}: ランキングの順位（１はじまり）
 *
 * @usage page.tsxレベル（＝最上位）で使用することを推奨
 */
export default function RankingAnchorHash({ children }: PropsWithChildren) {
  useEffect(() => {
    // URLからハッシュを取得 (#18 -> 18)
    const hash = window.location.hash.slice(1)
    if (!hash) return

    // 対象の要素を取得
    const targetElement = document.getElementById(`rank-${hash}`)
    if (!targetElement) return

    // 要素をハイライト
    targetElement.classList.add(
      'bg-accent',
      'transition-colors',
      'duration-500'
    )

    // 要素までスクロール
    targetElement.scrollIntoView({ behavior: 'instant', block: 'center' })
  }, [])

  return <>{children}</>
}
