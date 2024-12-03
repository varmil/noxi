import { MetadataRoute } from 'next'
import { GroupStrings } from 'config/constants/Site'
import { getEntry } from 'config/sitemap/getEntry'
import dayjs from 'lib/dayjs'

const groupEntries = GroupStrings.flatMap(group => {
  return [
    getEntry({ pathname: `/${group}`, lastModified: new Date() }),
    getEntry({ pathname: `/${group}/live`, lastModified: new Date() }),
    getEntry({ pathname: `/${group}/scheduled`, lastModified: new Date() }),
    getEntry({ pathname: `/${group}/ended`, lastModified: new Date() }),
    getEntry({
      pathname: `/${group}/charts/channels`,
      lastModified: dayjs().subtract(1, 'day').toDate()
    })
  ]
})

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry({
      pathname: '/',
      lastModified: dayjs().subtract(7, 'day').toDate()
    }),
    getEntry({
      pathname: '/terms-of-use-and-privacy-policy',
      lastModified: dayjs().subtract(14, 'day').toDate()
    })
  ].concat(groupEntries)
}
