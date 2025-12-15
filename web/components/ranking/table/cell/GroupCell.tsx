import { ComponentProps } from 'react'
import { TableCell } from '@/components/ui/table'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'

export default function GroupCell({ groupId }: { groupId: string }) {
  return (
    <Cell className="hidden @3xl:table-cell" width={100}>
      <GroupImageOrIcon className="size-7 m-auto" groupId={groupId} />
    </Cell>
  )
}

function Cell({
  children,
  className,
  ...props
}: ComponentProps<typeof TableCell>) {
  return (
    <TableCell {...props} className={`p-0 sm:p-2 ${className ?? ''}`}>
      {children}
    </TableCell>
  )
}
