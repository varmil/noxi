/**
 * 2025/05/01：periodは区別しないcanonicalにしてみる
 * 2025/05/01：genderは区別しないcanonicalにしてみる
 */
import { MetadataRoute } from 'next'
import { getGroups } from 'apis/groups/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { Period } from 'types/period'

export const dynamic = 'force-dynamic'

const periods: Period[] = [
  // 'last24Hours'
  // 'last7Days',
  'last30Days'
  // 'last1Year',
  // 'thisWeek',
  // 'thisMonth',
  // 'thisYear'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // super-chat x overall
  const overallSuperChatEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/super-chat/channels/all/last30Days`
    })
  ]

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      return getEntry({
        lastModified: new Date(),
        pathname: `/ranking/super-chat/channels/${group.id}/${period}`
      })
    })
  })

  // subscriber x overall
  const overallSubscriberEntries = [
    getEntry({
      lastModified: new Date(),
      pathname: `/ranking/subscriber/channels/all/wholePeriod`
    })
  ]

  // subscriber x group
  const groupSubscriberEntries = groups.map(group => {
    return getEntry({
      lastModified: new Date(),
      pathname: `/ranking/subscriber/channels/${group.id}/wholePeriod`
    })
  })

  return overallSuperChatEntries
    .concat(groupSuperChatEntries)
    .concat(overallSubscriberEntries)
    .concat(groupSubscriberEntries)
}
