import { PropsWithChildren } from 'react'
import { TableCell } from '@/components/ui/table'
import { Link } from 'lib/navigation'

export default function LinkCell({
  videoId,
  className,
  width,
  children
}: PropsWithChildren<{
  videoId: string
  className?: string
  width?: number
}>) {
  return (
    <TableCell width={width} className={className ?? ''}>
      <Link href={`/youtube/live/${videoId}`} prefetch={false}>
        {children}
      </Link>
    </TableCell>
  )
}
