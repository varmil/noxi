import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { MostCheeredPeriod } from 'types/period'

export const dynamic = 'force-dynamic'

const periods: MostCheeredPeriod[] = ['last30Days']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // overall
  const overallEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/most-cheered/all/last30Days`
    })
  ]

  // group
  const groupEntries = groups.flatMap(group => {
    return periods.map(period => {
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/most-cheered/${group.val}/${period}`
      })
    })
  })

  return overallEntries.concat(groupEntries)
}
