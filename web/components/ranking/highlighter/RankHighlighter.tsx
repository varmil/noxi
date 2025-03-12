'use client'

import { PropsWithChildren, useEffect } from 'react'
import {
  RANK_HIGHLIGHTER_ID_PREFIX,
  RANK_HIGHLIGHTER_STORAGE_KEY
} from 'components/ranking/highlighter/rank-highlighter'

/**
 * sessionStorage に RANK_HIGHLIGHTER_STORAGE_KEY
 * があった場合、対象の要素をハイライト
 *
 * @usage page.tsxレベル（＝最上位）で使用することを推奨
 */
export default function RankHighlighter({ children }: PropsWithChildren) {
  useEffect(() => {
    const channelId = sessionStorage.getItem(RANK_HIGHLIGHTER_STORAGE_KEY)
    if (channelId) {
      // セッションストレージから削除
      sessionStorage.removeItem(RANK_HIGHLIGHTER_STORAGE_KEY)

      // 対象の要素を取得
      const targetElement = document.getElementById(
        `${RANK_HIGHLIGHTER_ID_PREFIX}${channelId}`
      )
      if (!targetElement) return

      // 要素までスクロール
      targetElement.scrollIntoView({ behavior: 'instant', block: 'center' })

      // 要素をハイライト
      targetElement.setAttribute('data-state', 'selected')
      targetElement.classList.add('transition-colors', 'duration-300')
    }
  }, [])

  return children
}
