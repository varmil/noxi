import { UserCircle, Webcam, MicVocal } from 'lucide-react'
import { GroupSchema } from 'apis/groups'

export const isIcon = (group: GroupSchema): boolean => {
  return (
    group.id === 'independent' ||
    group.id === 'independent-irl' ||
    group.id === 'artist'
  )
}

export const getIcon = (group: GroupSchema): any => {
  switch (group.id) {
    case 'independent':
      return UserCircle
    case 'independent-irl':
      return Webcam
    case 'artist':
      return MicVocal
  }
}
