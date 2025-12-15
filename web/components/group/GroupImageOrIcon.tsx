import Image from 'components/styles/Image'

import { getGroups } from 'hooks/useGroups'

export default async function GroupImageOrIcon({
  groupId,
  className
}: {
  groupId: string
  className?: string
}) {
  const groups = await getGroups()
  const { findGroup, isImg, isIcon } = groups
  const group = findGroup(groupId)

  if (isImg(group)) {
    return (
      <Image
        src={group.src}
        alt={`${group.name} icon`}
        width={20}
        height={20}
        className={`rounded-full ${className || ''}`}
      />
    )
  }

  if (isIcon(group)) {
    return <group.icon className={`rounded-full ${className || ''}`} />
  }

  return null
}
