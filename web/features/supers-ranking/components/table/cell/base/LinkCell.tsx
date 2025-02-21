import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { RANK_HIGHLIGHTER_QS_KEY } from 'components/ranking/highlighter/rank-highlighter'
import { GroupString } from 'config/constants/Site'
import { Link } from 'lib/navigation'
import { Gender } from 'types/gender'
import { Period } from 'types/period'

export default function LinkCell({
  period,
  group,
  gender,
  page,
  channelId,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  period: Period
  group?: GroupString
  gender?: Gender
  /** min 1 */
  page?: number
  /** RankHighlighter用。指定されている場合遷移後にBrowserでscroll＋highlight */
  channelId?: string
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  const searchParams = new URLSearchParams({
    period,
    ...(group && { group }),
    ...(gender && { gender }),
    ...(page && page >= 2 && { page: page.toString() }),
    ...(channelId && { [RANK_HIGHLIGHTER_QS_KEY]: channelId })
  })

  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link
        href={`/youtube/channels/ranking?${searchParams.toString()}`}
        prefetch={true}
      >
        {children}
      </Link>
    </TableCell>
  )
}
