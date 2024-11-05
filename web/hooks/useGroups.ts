import { Webcam } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GroupStrings } from 'config/constants/Site'

// 通信で取るかも
const counts = {
  hololive: { val: 39, isAll: true },
  vspo: { val: 5, isAll: false },
  independent: { val: 16, isAll: false },
  'hololive-english': { val: 18, isAll: true },
  'hololive-indonesia': { val: 9, isAll: true },
  'independent-irl': { val: 10, isAll: false }
}

export default function useGroups() {
  const t = useTranslations('Global.group')
  const imgs = GroupStrings.filter(group => group !== 'independent-irl').map(
    group => {
      return {
        id: group,
        name: t(`${group}`),
        src: `/group/${group}/logo.png`,
        count: counts[group]
      }
    }
  )

  const icons = GroupStrings.filter(group => group === 'independent-irl').map(
    group => {
      return {
        id: group,
        name: t(`${group}`),
        icon: Webcam,
        count: counts[group]
      }
    }
  )

  return { imgs, icons }
}
