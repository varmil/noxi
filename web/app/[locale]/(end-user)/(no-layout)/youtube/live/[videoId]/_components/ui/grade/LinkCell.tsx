import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { Link } from 'lib/navigation'

export default function LinkCell({
  href,
  page,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  href: string
  /** min 1 */
  page?: number
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link
        href={`${href}${page && page >= 2 ? `&page=${page}` : ''}`}
        prefetch={false}
      >
        {children}
      </Link>
    </TableCell>
  )
}
