/**
 * 2025/05/01：periodは区別しないcanonicalにしてみる
 * 2025/05/01：genderは区別しないcanonicalにしてみる
 */
import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { StreamRankingPeriod } from 'types/period'
import { createSearchParams } from 'utils/ranking/stream-ranking'

export const dynamic = 'force-dynamic'

const periods: StreamRankingPeriod[] = [
  'realtime'
  // 'last24Hours',
  // 'last7Days',
  // 'last30Days',
  // 'last1Year'
]

// const genders = [undefined, 'male', 'female'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // concurrent-viewer x overall
  const overallConcurrentViewerEntries = periods.map(period => {
    const searchParams = createSearchParams({
      period
    })
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/concurrent-viewer/live/all?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  // concurrent-viewer x group
  const groupConcurrentViewerEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        period
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/concurrent-viewer/live/${group.val}?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // super-chat x overall
  const overallSuperChatEntries = periods.map(period => {
    const searchParams = createSearchParams({
      period
    })
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/super-chat/live/all?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        period
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/super-chat/live/${group.val}?${searchParams
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
