import { MetadataRoute } from 'next'
import { GroupStrings } from 'config/constants/Group'
import { getEntry } from 'config/sitemap/getEntry'

export const dynamic = 'force-dynamic'

const groupEntries = GroupStrings.flatMap(group => {
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
    getEntry({ pathname: '/', lastModified: new Date() }),
    getEntry({ pathname: '/terms-of-use-and-privacy-policy' })
  ].concat(groupEntries)
}
