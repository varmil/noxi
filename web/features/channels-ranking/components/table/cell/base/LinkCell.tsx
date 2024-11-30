import { PropsWithChildren } from 'react'
import { TableCell } from '@/components/ui/table'
import { GroupString } from 'config/constants/Site'
import { Link } from 'lib/navigation'

export default function LinkCell({
  channelId,
  group,
  className,
  width,
  children
}: PropsWithChildren<{
  channelId: string
  group: GroupString
  className?: string
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''}>
      <Link href={`/${group}/channels/${channelId}`}>{children}</Link>
    </TableCell>
  )
}
