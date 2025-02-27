import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { RANK_HIGHLIGHTER_QS_KEY } from 'components/ranking/highlighter/rank-highlighter'
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
  [RANK_HIGHLIGHTER_QS_KEY]?: string
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  const searchParams = createSearchParams({
    dimension: 'super-chat',
    period,
    group,
    gender,
    page,
    channelId
  })

  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link
        href={`/youtube/channels/ranking?${searchParams.toString()}`}
        prefetch={false}
      >
        {children}
      </Link>
    </TableCell>
  )
}
