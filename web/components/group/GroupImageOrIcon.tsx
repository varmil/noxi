import { UserCircle, Webcam, MicVocal } from 'lucide-react'
import { getGroup } from 'apis/groups'
import Image from 'components/styles/Image'
import { isIcon } from 'utils/group'

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

  const iconClassName = `rounded-full ${className || ''}`

  if (isIcon(group)) {
    switch (group.id) {
      case 'independent':
        return <UserCircle className={iconClassName} />
      case 'independent-irl':
        return <Webcam className={iconClassName} />
      case 'artist':
        return <MicVocal className={iconClassName} />
    }
  }

  return (
    <Image
      src={group.iconSrc}
      alt={`${group.name} icon`}
      width={20}
      height={20}
      className={iconClassName}
    />
  )
}
