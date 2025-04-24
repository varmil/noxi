import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { StreamRankingPeriod } from 'types/period'
import { createSearchParams } from 'utils/ranking/stream-ranking'

export const dynamic = 'force-dynamic'

const periods: StreamRankingPeriod[] = [
  'realtime',
  'last24Hours',
  'last7Days',
  'last30Days',
  'last1Year'
]

const genders = [undefined, 'male', 'female'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // concurrent-viewer x overall x gender
  const overallConcurrentViewerEntries = genders.flatMap(gender => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        dimension: 'concurrent-viewer',
        period,
        ...(gender && { gender })
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/youtube/live/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // concurrent-viewer x group
  const groupConcurrentViewerEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        dimension: 'concurrent-viewer',
        period,
        group: group.val
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/youtube/live/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // super-chat x overall x gender
  const overallSuperChatEntries = genders.flatMap(gender => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        dimension: 'super-chat',
        period,
        ...(gender && { gender })
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/youtube/live/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        dimension: 'super-chat',
        period,
        group: group.val
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/youtube/live/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  return overallConcurrentViewerEntries
    .concat(groupConcurrentViewerEntries)
    .concat(overallSuperChatEntries)
    .concat(groupSuperChatEntries)
}
