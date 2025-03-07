import { ComponentProps } from 'react'
import { TableCell } from '@/components/ui/table'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import { GroupString } from 'config/constants/Group'

export default function TableCellOfGroup({
  groupId
}: {
  groupId: GroupString
}) {
  return (
    <Cell className="hidden @3xl:table-cell" width={100}>
      <GroupImageOrIcon className="w-8 h-8 m-auto" groupId={groupId} />
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
