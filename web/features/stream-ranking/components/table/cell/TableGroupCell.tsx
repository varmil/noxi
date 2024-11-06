import { ComponentProps } from 'react'
import { TableCell } from '@/components/ui/table'
import Image from 'components/styles/Image'
import { GroupString } from 'config/constants/Site'
import useGroups from 'hooks/useGroups'

export default function TableGroupCell({
  groupId,
  width
}: {
  groupId: GroupString
  width?: number
}) {
  const { findGroup, isImg, isIcon } = useGroups()
  const group = findGroup(groupId)

  if (isImg(group)) {
    return (
      <Cell width={width}>
        <Image
          src={group.src}
          alt={`${group.name} icon`}
          width={20}
          height={20}
          className={`w-5 h-5 rounded-full`}
        />
      </Cell>
    )
  }

  if (isIcon(group)) {
    return (
      <Cell width={width}>
        <group.icon className="w-5 h-5 rounded-full" />
      </Cell>
    )
  }

  return null
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
