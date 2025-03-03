import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { Period } from 'types/period'
import { createSearchParams } from 'utils/ranking/channels-ranking'

export const dynamic = 'force-dynamic'

const periods: Period[] = [
  'last24Hours',
  'last7Days',
  'last30Days',
  'last1Year',
  'thisWeek',
  'thisMonth',
  'thisYear'
]

const genders = [undefined, 'male', 'female'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // super-chat x overall x gender
  const overallSuperChatEntries = genders.flatMap(gender => {
    return periods.map(period => {
      const searchParams = createSearchParams({
        dimension: 'super-chat',
        period,
        ...(gender && { gender })
      })
      return getEntry({
        changeFrequency: 'hourly',
        lastModified: new Date(),
        pathname: `/youtube/channels/ranking?${searchParams
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
        changeFrequency: 'hourly',
        lastModified: new Date(),
        pathname: `/youtube/channels/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // subscriber x overall x gender
  const overallSubscriberEntries = genders.flatMap(gender => {
    const searchParams = createSearchParams({
      dimension: 'subscriber',
      period: 'all',
      ...(gender && { gender })
    })
    return getEntry({
      changeFrequency: 'hourly',
      lastModified: new Date(),
      pathname: `/youtube/channels/ranking?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  // subscriber x group
  const groupSubscriberEntries = groups.map(group => {
    const searchParams = createSearchParams({
      dimension: 'subscriber',
      period: 'all',
      group: group.val
    })
    return getEntry({
      changeFrequency: 'hourly',
      lastModified: new Date(),
      pathname: `/youtube/channels/ranking?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  return overallSuperChatEntries
    .concat(groupSuperChatEntries)
    .concat(overallSubscriberEntries)
    .concat(groupSubscriberEntries)
}
