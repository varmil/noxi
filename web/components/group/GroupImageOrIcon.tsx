import Image from 'components/styles/Image'

import useGroups from 'hooks/useGroups'

export default function GroupImageOrIcon({
  groupId,
  className
}: {
  groupId: string
  className?: string
}) {
  const { findGroup, isImg, isIcon } = useGroups()
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
