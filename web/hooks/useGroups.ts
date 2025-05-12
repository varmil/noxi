import React from 'react'
import { LucideProps, MicVocal, UserCircle, Webcam } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { GroupStrings } from 'config/constants/Group'

// 通信で取るかも
const counts = {
  '774inc': { val: 24, isAll: true },
  atatakakunaru: { val: 1, isAll: false },
  dotlive: { val: 19, isAll: false },
  'first-stage': { val: 3, isAll: false },
  hololive: { val: 43, isAll: true },
  'hololive-english': { val: 18, isAll: true },
  'hololive-indonesia': { val: 9, isAll: true },
  holostars: { val: 22, isAll: true },
  nijisanji: { val: 153, isAll: true },
  'nijisanji-en': { val: 11, isAll: false },
  noripro: { val: 3, isAll: false },
  vspo: { val: 23, isAll: true },
  'kizuna-ai': { val: 1, isAll: false },
  'neo-porte': { val: 21, isAll: true },
  'aogiri-high-school': { val: 14, isAll: true },
  specialite: { val: 21, isAll: true },
  mixstgirls: { val: 8, isAll: true },
  'idol-corp': { val: 13, isAll: true },
  trillionstage: { val: 3, isAll: false },
  utatane: { val: 1, isAll: false },
  varium: { val: 2, isAll: false },
  vividv: { val: 1, isAll: false },
  voms: { val: 6, isAll: true },
  independent: { val: 150, isAll: false },
  'independent-irl': { val: 20, isAll: false },
  artist: { val: 1, isAll: false }
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

const IconGroups = ['independent', 'independent-irl', 'artist']

export default function useGroups() {
  const t = useTranslations('Global.group')
  return func(t)
}

export const getGroups = async () => {
  const t = await getTranslations('Global.group')
  return func(t)
}

const func = (t: ReturnType<typeof useTranslations<'Global.group'>>) => {
  const imgs = GroupStrings.filter(
    group => !IconGroups.includes(group)
  ).map<Img>(group => {
    return {
      id: group,
      name: t(`${group}`),
      src: `/group/${group}/logo.png`,
      count: counts[group]
    }
  })

  const icons = GroupStrings.filter(group =>
    IconGroups.includes(group)
  ).map<Icon>(group => {
    switch (group) {
      case 'independent':
        return {
          id: group,
          name: t(`${group}`),
          icon: UserCircle,
          count: counts[group]
        }
      case 'independent-irl':
        return {
          id: group,
          name: t(`${group}`),
          icon: Webcam,
          count: counts[group]
        }
      case 'artist':
        return {
          id: group,
          name: t(`${group}`),
          icon: MicVocal,
          count: counts[group]
        }
      default:
        throw new Error('unknown group')
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
