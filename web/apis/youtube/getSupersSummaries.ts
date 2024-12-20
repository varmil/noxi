import {
  SupersSummariesSchema,
  responseListSchema
} from 'apis/youtube/schema/supersSummarySchema'
import { Gender } from 'config/constants/Gender'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelIds?: string[]
  group?: GroupString
  gender?: Gender
  orderBy?: {
    field:
      | 'last24Hours'
      | 'last7Days'
      | 'last30Days'
      | 'last90Days'
      | 'last1Year'
      | 'thisWeek'
      | 'thisMonth'
      | 'thisYear'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
  date?: Date
}

export async function getSupersSummaries({
  channelIds,
  group,
  gender,
  orderBy,
  limit,
  offset,
  date
}: Params): Promise<SupersSummariesSchema> {
  const searchParams = new URLSearchParams({
    ...(channelIds && { channelIds: [...new Set(channelIds)].join(',') }),
    ...(group && { group }),
    ...(gender && { gender }),
    ...(limit && { limit: String(limit) }),
    ...(offset && { offset: String(offset) }),
    ...(date && { date: date.toISOString() })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(`/api/supers-summaries?${searchParams.toString()}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseListSchema.parse(await res.json())
  return data.list
}
