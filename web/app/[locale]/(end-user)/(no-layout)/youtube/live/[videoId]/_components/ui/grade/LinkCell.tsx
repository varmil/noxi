import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { Link } from 'lib/navigation'
import { Gender } from 'types/gender'
import { createSearchParams } from 'utils/ranking/stream-ranking'

export default function LinkCell({
  pathname,
  gender,
  page,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  pathname: string
  gender?: Gender
  /** min 1 */
  page?: number
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  const searchParams = createSearchParams({
    gender,
    page
  })
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link
        href={`${pathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`}
        prefetch={false}
      >
        {children}
      </Link>
    </TableCell>
  )
}
