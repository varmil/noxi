import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { Link } from 'lib/navigation'

export default function LinkToUserCell({
  username,
  align,
  className,
  width,
  prefetch = false,
  children
}: PropsWithChildren<{
  username: string
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  prefetch?: boolean
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link href={`/users/${username}`} prefetch={prefetch}>
        {children}
      </Link>
    </TableCell>
  )
}
