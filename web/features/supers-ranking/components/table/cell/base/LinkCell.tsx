import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { GroupString } from 'config/constants/Site'
import { Link } from 'lib/navigation'
import { Gender } from 'types/gender'
import { Period } from 'types/period'

export default function LinkCell({
  period,
  group,
  gender,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  period: Period
  group?: GroupString
  gender?: Gender
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  const searchParams = new URLSearchParams({
    period,
    ...(group && { group }),
    ...(gender && { gender })
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
