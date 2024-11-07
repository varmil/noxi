import React from 'react'
import { LucideProps, Webcam } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GroupStrings } from 'config/constants/Site'

// 通信で取るかも
const counts = {
  hololive: { val: 43, isAll: true },
  vspo: { val: 5, isAll: false },
  'hololive-english': { val: 18, isAll: true },
  'hololive-indonesia': { val: 9, isAll: true },
  'idol-corp': { val: 13, isAll: true },
  independent: { val: 25, isAll: false },
  'independent-irl': { val: 10, isAll: false }
}

type Count = {
  val: number
  isAll: boolean
}

type Img = {
  id: string
  name: string
  src: string
  count: Count
}

type Icon = {
  id: string
  name: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  count: Count
}

type Group = Img | Icon

export default function useGroups() {
  const t = useTranslations('Global.group')
  const imgs = GroupStrings.filter(
    group => group !== 'independent-irl'
  ).map<Img>(group => {
    return {
      id: group,
      name: t(`${group}`),
      src: `/group/${group}/logo.png`,
      count: counts[group]
    }
  })

  const icons = GroupStrings.filter(
    group => group === 'independent-irl'
  ).map<Icon>(group => {
    return {
      id: group,
      name: t(`${group}`),
      icon: Webcam,
      count: counts[group]
    }
  })

  const findGroup = (group: string) => {
    let result: Group | undefined

    result = imgs.find(e => e.id === group)
    if (result) return result

    result = icons.find(e => e.id === group)
    if (result) return result

    return undefined
  }

  function isImg(arg: any): arg is Img {
    return arg.src !== undefined
  }

  function isIcon(arg: any): arg is Icon {
    return arg.icon !== undefined
  }

  return { imgs, icons, findGroup, isImg, isIcon }
}
