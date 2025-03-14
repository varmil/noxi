import { PropsWithChildren, TdHTMLAttributes } from 'react'
import { TableCell } from '@/components/ui/table'
import { GroupString } from 'config/constants/Group'
import { Link } from 'lib/navigation'

export default function LinkToChannelCell({
  channelId,
  group,
  align,
  className,
  width,
  prefetch = false,
  children
}: PropsWithChildren<{
  channelId: string
  group: GroupString
  align?: TdHTMLAttributes<unknown>['align']
  className?: string
  prefetch?: boolean
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''} align={align}>
      <Link href={`/${group}/channels/${channelId}`} prefetch={prefetch}>
        {children}
      </Link>
    </TableCell>
  )
}
