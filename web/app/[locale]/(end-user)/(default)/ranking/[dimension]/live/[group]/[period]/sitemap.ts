/**
 * 2025/05/01：periodは区別しないcanonicalにしてみる
 * 2025/05/01：genderは区別しないcanonicalにしてみる
 */
import { MetadataRoute } from 'next'
import { getGroups } from 'apis/groups/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { StreamRankingPeriod } from 'types/period'

export const dynamic = 'force-dynamic'

const periods: StreamRankingPeriod[] = [
  // 'realtime'
  // 'last24Hours',
  // 'last7Days',
  'last30Days'
  // 'last1Year'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // concurrent-viewer x overall
  const overallConcurrentViewerEntries = periods.map(period => {
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/concurrent-viewer/live/all/${period}`
    })
  })

  // concurrent-viewer x group
  const groupConcurrentViewerEntries = groups.flatMap(group => {
    return periods.map(period => {
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/concurrent-viewer/live/${group.id}/${period}`
      })
    })
  })

  // super-chat x overall
  const overallSuperChatEntries = periods.map(period => {
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/super-chat/live/all/${period}`
    })
  })

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/super-chat/live/${group.id}/${period}`
      })
    })
  })

  return overallConcurrentViewerEntries
    .concat(groupConcurrentViewerEntries)
    .concat(overallSuperChatEntries)
    .concat(groupSuperChatEntries)
}
