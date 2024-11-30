import {
  SupersSummariesSchema,
  responseSchema
} from 'apis/youtube/schema/supersSummarySchema'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  group?: GroupString
  orderBy?: {
    field:
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
}

export async function getSupersSummaries({
  group,
  orderBy,
  limit,
  offset
}: Params): Promise<SupersSummariesSchema> {
  const searchParams = new URLSearchParams({
    ...(group && { group }),
    ...(limit && { limit: String(limit) }),
    ...(offset && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(
    `/api/supers-summaries?${searchParams.toString()}`,
    {
      cache: 'no-cache'
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
