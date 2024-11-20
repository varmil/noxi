import { ComponentProps } from 'react'
import { TableCell } from '@/components/ui/table'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import { GroupString } from 'config/constants/Site'

export default function TableGroupCell({
  groupId,
  width,
  className
}: {
  groupId: GroupString
  width?: number
  className?: string
}) {
  return (
    <Cell width={width} className={className}>
      <GroupImageOrIcon className="w-5 h-5" groupId={groupId} />
    </Cell>
  )
}

function Cell({
  children,
  className,
  ...props
}: ComponentProps<typeof TableCell>) {
  return (
    <TableCell
      {...props}
      className={`p-0 sm:p-2 justify-items-center ${className ?? ''}`}
    >
      {children}
    </TableCell>
  )
}
