'use client'

import { PropsWithChildren } from 'react'
import { RANK_HIGHLIGHTER_STORAGE_KEY } from 'components/ranking/highlighter/rank-highlighter'
import Underline from 'components/styles/string/Underline'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import { Link } from 'lib/navigation'
import { Period } from 'types/period'
import { createSearchParams } from 'utils/ranking/channels-ranking'

/** rankが圏内ならばランキングページへリンク。圏外ならばリンクしない */
export default function LinkToRanking({
  period,
  rank,
  highlightedChannelId: channelId,
  children
}: PropsWithChildren<{
  period: Period
  rank?: number
  [RANK_HIGHLIGHTER_STORAGE_KEY]?: string
}>) {
  if (!rank) {
    return <>{children}</>
  }

  const page = ChannelsRankingPagination.getPageFromRank(rank)
  const searchParams = createSearchParams({
    dimension: 'super-chat',
    period,
    page
  })
  return (
    <Link
      href={`/ranking/channels?${searchParams.toString()}`}
      prefetch={false}
      onClick={() => {
        if (channelId) {
          sessionStorage.setItem(RANK_HIGHLIGHTER_STORAGE_KEY, channelId)
        }
      }}
    >
      <Underline>{children}</Underline>
    </Link>
  )
}
