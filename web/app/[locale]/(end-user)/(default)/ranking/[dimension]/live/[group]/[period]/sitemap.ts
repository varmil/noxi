import { MetadataRoute } from 'next'
import { getGroups } from 'apis/groups/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { StreamRankingPeriod } from 'types/period'

export const dynamic = 'force-dynamic'

/** UIで使用される期間（各ページをcanonicalとして登録） */
const PERIODS: StreamRankingPeriod[] = [
  'realtime',
  'last24Hours',
  'last7Days',
  'last30Days',
  'wholePeriod'
]

const DIMENSIONS = ['concurrent-viewer', 'super-chat'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  const entries = DIMENSIONS.flatMap(dimension => {
    // overall (all)
    const overallEntries = PERIODS.map(period =>
      getEntry({
        lastModified: new Date(),
        pathname: `/ranking/${dimension}/live/all/${period}`
      })
    )

    // group
    const groupEntries = groups.flatMap(group =>
      PERIODS.map(period =>
        getEntry({
          lastModified: new Date(),
          pathname: `/ranking/${dimension}/live/${group.id}/${period}`
        })
      )
    )

    return [...overallEntries, ...groupEntries]
  })

  return entries
}
