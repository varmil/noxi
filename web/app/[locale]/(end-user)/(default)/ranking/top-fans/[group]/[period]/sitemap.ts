import { MetadataRoute } from 'next'
import { getGroups } from 'apis/groups/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { TopFansPeriod } from 'types/period'

export const dynamic = 'force-dynamic'

const periods: TopFansPeriod[] = ['last30Days']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // overall
  const overallEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/top-fans/all/last30Days`
    })
  ]

  // group
  const groupEntries = groups.flatMap(group => {
    return periods.map(period => {
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/top-fans/${group.id}/${period}`
      })
    })
  })

  return overallEntries.concat(groupEntries)
}
