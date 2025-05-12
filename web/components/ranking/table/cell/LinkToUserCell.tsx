import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { Link } from 'lib/navigation'

export default function LinkToChannelCell({
  userId,
  align,
  className,
  width,
  prefetch = false,
  children
}: PropsWithChildren<{
  userId: number
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  prefetch?: boolean
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link href={`/users/${userId}`} prefetch={prefetch}>
        {children}
      </Link>
    </TableCell>
  )
}
