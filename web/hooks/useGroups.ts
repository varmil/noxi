import React from 'react'
import { LucideProps, MicVocal, UserCircle, Webcam } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getGroups as getGroupsFromAPI } from 'apis/groups'

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

export const getGroups = async () => {
  const t = await getTranslations('Global.group')

  // APIからGroupsを取得
  const apiGroups = await getGroupsFromAPI()
  return funcWithAPI(t, apiGroups)
}

// API連携版の関数
const funcWithAPI = (
  t: ReturnType<typeof useTranslations<'Global.group'>>,
  apiGroups: Awaited<ReturnType<typeof getGroupsFromAPI>>
) => {
  // APIから取得したGroupsをImg形式に変換
  const apiImgs = apiGroups
    .filter(group => !IconGroups.includes(group.id))
    .map<Img>(group => ({
      id: group.id,
      name: group.name,
      src: group.iconSrc,
      count: counts[group.id as keyof typeof counts] || { val: 0, isAll: false }
    }))

  // アイコングループはAPIから取得したデータを使用
  const icons = apiGroups
    .filter(group => IconGroups.includes(group.id))
    .map<Icon>(group => {
      switch (group.id) {
        case 'independent':
          return {
            id: group.id,
            name: t(`${group.id}`),
            icon: UserCircle,
            count: counts[group.id as keyof typeof counts] || {
              val: 0,
              isAll: false
            }
          }
        case 'independent-irl':
          return {
            id: group.id,
            name: t(`${group.id}`),
            icon: Webcam,
            count: counts[group.id as keyof typeof counts] || {
              val: 0,
              isAll: false
            }
          }
        case 'artist':
          return {
            id: group.id,
            name: t(`${group.id}`),
            icon: MicVocal,
            count: counts[group.id as keyof typeof counts] || {
              val: 0,
              isAll: false
            }
          }
        default:
          throw new Error(`Unknown icon group: ${group.id}`)
      }
    })

  const findGroup = (group: string) => {
    let result: Group | undefined

    result = apiImgs.find(e => e.id === group)
    if (result) return result

    result = icons.find(e => e.id === group)
    if (result) return result

    return undefined
  }

  function isImg(arg: Group): arg is Img {
    return 'src' in arg
  }

  function isIcon(arg: Group): arg is Icon {
    return 'icon' in arg
  }

  return { imgs: apiImgs, icons, findGroup, isImg, isIcon }
}
