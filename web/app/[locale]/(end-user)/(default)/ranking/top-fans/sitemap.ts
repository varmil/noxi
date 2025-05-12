import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { TopFansPeriod } from 'types/period'
import { createSearchParams } from 'utils/ranking/most-cheered'

export const dynamic = 'force-dynamic'

const periods: TopFansPeriod[] = ['last30Days']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // overall
  const overallEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/top-fans?${createSearchParams({
        period: 'last30Days'
      })
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  ]

  // group
  const groupEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        period,
        group: group.val
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/top-fans?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  return overallEntries.concat(groupEntries)
}
