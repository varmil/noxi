'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  RANK_HIGHLIGHTER_ID_PREFIX,
  RANK_HIGHLIGHTER_QS_KEY
} from 'components/ranking/highlighter/rank-highlighter'
import useQueryString from 'hooks/useQueryString'
import { usePathname, useRouter } from 'lib/navigation'

/**
 * ?rank={number} があった場合、対象の要素をハイライト
 * {number}: ランキングの順位（１はじまり）
 *
 * @usage page.tsxレベル（＝最上位）で使用することを推奨
 */
export default function RankHighlighter({ children }: PropsWithChildren) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { createQueryString } = useQueryString()

  useEffect(() => {
    const rank = searchParams.get(RANK_HIGHLIGHTER_QS_KEY)
    if (!rank) return

    // 対象の要素を取得
    const targetElement = document.getElementById(
      `${RANK_HIGHLIGHTER_ID_PREFIX}${rank}`
    )
    if (!targetElement) return

    // 要素までスクロール
    targetElement.scrollIntoView({ behavior: 'instant', block: 'center' })

    // 要素をハイライト
    targetElement.classList.add(
      'bg-accent',
      'transition-colors',
      'duration-800'
    )

    // クエリストリングから削除
    router.replace(
      `${pathname}?${createQueryString(RANK_HIGHLIGHTER_QS_KEY, null)}`,
      {
        scroll: false
      }
    )
  }, [createQueryString, pathname, router, searchParams])

  return children
}
