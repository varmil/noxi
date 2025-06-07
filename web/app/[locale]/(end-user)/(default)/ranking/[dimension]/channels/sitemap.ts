/**
 * 2025/05/01：periodは区別しないcanonicalにしてみる
 * 2025/05/01：genderは区別しないcanonicalにしてみる
 */
import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { Period } from 'types/period'
import { createSearchParams } from 'utils/ranking/channels-ranking'

export const dynamic = 'force-dynamic'

const periods: Period[] = [
  'last24Hours'
  // 'last7Days',
  // 'last30Days',
  // 'last1Year',
  // 'thisWeek',
  // 'thisMonth',
  // 'thisYear'
]

const genders = [undefined, 'male', 'female'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // super-chat x overall
  const overallSuperChatEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/super-chat/channels/all?${createSearchParams({
        period: 'last24Hours'
      })
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  ]

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        period
      })
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/super-chat/channels/${group.val}?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // subscriber x overall x gender
  const overallSubscriberEntries = genders.flatMap(gender => {
    const searchParams = createSearchParams({
      period: 'all',
      ...(gender && { gender })
    })
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/subscriber/channels?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  // subscriber x group
  const groupSubscriberEntries = groups.map(group => {
    const searchParams = createSearchParams({
      period: 'all'
    })
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/subscriber/channels/${group.val}?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  return overallSuperChatEntries
    .concat(groupSuperChatEntries)
    .concat(overallSubscriberEntries)
    .concat(groupSubscriberEntries)
}
