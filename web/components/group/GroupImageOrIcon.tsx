import { getGroup } from 'apis/groups'
import Image from 'components/styles/Image'
import { isIcon, getIcon } from 'utils/group'

export default async function GroupImageOrIcon({
  groupId,
  className
}: {
  groupId: string
  className?: string
}) {
  const group = await getGroup(groupId)
  if (!group) {
    return null
  }

  if (isIcon(group)) {
    const Icon = getIcon(group)
    return <Icon className={`rounded-full ${className || ''}`} />
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
