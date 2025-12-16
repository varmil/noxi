import { MetadataRoute } from 'next'
import { getEntry } from 'config/sitemap/getEntry'

// 既存のGroup定数（後でAPIから取得に変更予定）
const AllGroups = [
  'hololive',
  'nijisanji',
  'vspo',
  'mixstgirls',
  'neo-porte',
  'dotlive',
  'first-stage',
  'varium',
  'voms',
  'utatane',
  'holostars',
  'noripro',
  'trillionstage',
  'aogiri-high-school',
  '774inc',
  'atatakakunaru',
  'specialite',
  'vividv',
  'hololive-english',
  'hololive-indonesia',
  'nijisanji-en',
  'idol-corp',
  'kizuna-ai',
  'independent',
  'independent-irl',
  'artist'
] as const

const groupEntries = AllGroups.flatMap(group => {
  return [
    getEntry({ pathname: `/${group}` }),
    getEntry({ pathname: `/${group}/live` }),
    getEntry({ pathname: `/${group}/scheduled` }),
    getEntry({ pathname: `/${group}/ended` }),
    getEntry({ pathname: `/${group}/charts/channels` })
  ]
})

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry({ pathname: '/' }),
    getEntry({ pathname: '/channels/add' }),
    getEntry({ pathname: '/contact' }),
    getEntry({ pathname: '/terms-of-use-and-privacy-policy' })
  ].concat(groupEntries)
}
