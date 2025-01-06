import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { GroupString } from 'config/constants/Site'
import { Link } from 'lib/navigation'

export default function LinkCell({
  channelId,
  group,
  align,
  className,
  width,
  children
}: PropsWithChildren<{
  channelId: string
  group: GroupString
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link href={`/${group}/channels/${channelId}`} prefetch={true}>
        {children}
      </Link>
    </TableCell>
  )
}
