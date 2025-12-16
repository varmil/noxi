import { GroupSchema } from 'apis/groups'
import Image from 'components/styles/Image'

interface GroupImageOrIconWithAPIProps {
  groupId: string
  className?: string
  groups: GroupSchema[]
}

export default function GroupImageOrIconWithAPI({
  groupId,
  className,
  groups
}: GroupImageOrIconWithAPIProps) {
  const group = groups.find(g => g.id === groupId)

  if (!group) {
    return null
  }

  return (
    <Image
      src={group.iconSrc}
      alt={`${group.name} icon`}
      width={20}
      height={20}
      className={`rounded-full ${className || ''}`}
    />
  )
}
