import { MetadataRoute } from 'next'
import { getGroups } from 'apis/youtube/getGroups'
import { getEntry } from 'config/sitemap/getEntry'
import { Period } from 'types/period'

const periods: Period[] = [
  'last24Hours',
  'last7Days',
  'last30Days',
  'last90Days',
  'last1Year',
  'thisWeek',
  'thisMonth',
  'thisYear'
]

const genders = [undefined, 'male', 'female']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getGroups()

  // super-chat x overall x gender
  const overallSuperChatEntries = genders.flatMap(gender => {
    return periods.map(period => {
      const searchParams = new URLSearchParams({
        dimension: 'super-chat',
        period,
        ...(gender && { gender })
      })
      return getEntry({
        pathname: `/youtube/channels/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // super-chat x group
  const groupSuperChatEntries = groups.flatMap(group => {
    return periods.map(period => {
      const searchParams = new URLSearchParams({
        dimension: 'super-chat',
        period,
        group: group.val
      })
      return getEntry({
        pathname: `/youtube/channels/ranking?${searchParams
          .toString()
          .replaceAll('&', '&amp;')}`
      })
    })
  })

  // subscriber x overall x gender
  const overallSubscriberEntries = genders.flatMap(gender => {
    const searchParams = new URLSearchParams({
      dimension: 'subscriber',
      period: 'all',
      ...(gender && { gender })
    })
    return getEntry({
      pathname: `/youtube/channels/ranking?${searchParams
        .toString()
        .replaceAll('&', '&amp;')}`
    })
  })

  // subscriber x group
  const groupSubscriberEntries = groups.map(group => {
    const searchParams = new URLSearchParams({
      dimension: 'subscriber',
      period: 'all',
      group: group.val
    })
    return getEntry({
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
