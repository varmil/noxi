'use client'

import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { RANK_HIGHLIGHTER_STORAGE_KEY } from 'components/ranking/highlighter/rank-highlighter'
import { GroupString } from 'config/constants/Group'
import { Link } from 'lib/navigation'
import { Gender } from 'types/gender'
import { Period } from 'types/period'
import { createSearchParams } from 'utils/ranking/channels-ranking'

export default function LinkCell({
  period,
  group,
  gender,
  page,
  highlightedChannelId: channelId,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  period: Period
  group: GroupString
  gender?: Gender
  /** min 1 */
  page?: number
  [RANK_HIGHLIGHTER_STORAGE_KEY]?: string
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  const searchParams = createSearchParams({
    period,
    gender,
    page
  })

  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link
        href={`/ranking/super-chat/channels/${group}?${searchParams.toString()}`}
        prefetch={false}
        onClick={() => {
          if (channelId) {
            sessionStorage.setItem(RANK_HIGHLIGHTER_STORAGE_KEY, channelId)
          }
        }}
      >
        {children}
      </Link>
    </TableCell>
  )
}
