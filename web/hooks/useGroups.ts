import { Webcam } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GroupStrings } from 'config/constants/Site'

export default function useGroups() {
  const t = useTranslations('Global.group')
  const imgs = GroupStrings.filter(group => group !== 'independent-irl').map(
    group => {
      return {
        id: group,
        name: t(`${group}`),
        src: `/group/${group}/logo.png`
      }
    }
  )

  const icons = GroupStrings.filter(group => group === 'independent-irl').map(
    group => {
      return {
        id: group,
        name: t(`${group}`),
        icon: Webcam
      }
    }
  )

  return { imgs, icons }
}
