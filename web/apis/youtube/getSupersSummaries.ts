import {
  SupersSummariesSchema,
  responseListSchema
} from 'apis/youtube/schema/supersSummarySchema'
import { GroupString } from 'config/constants/Group'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { Period } from 'types/period'

type Params = {
  channelIds?: string[]
  group?: GroupString
  gender?: Gender
  amountMicros?: {
    period: Period
    operator: 'gt' | 'gte' | 'lt' | 'lte'
    value: number
  }
  date?: Date

  orderBy?: {
    field: Period
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

const createSearchParams = ({
  channelIds,
  group,
  gender,
  amountMicros,
  orderBy,
  limit,
  offset,
  date
}: Params) => {
  const searchParams = new URLSearchParams({
    ...(channelIds && { channelIds: [...new Set(channelIds)].join(',') }),
    ...(group && { group }),
    ...(gender && { gender }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) }),
    ...(date && { date: date.toISOString() })
  })

  if (amountMicros) {
    searchParams.append('amountMicros[period]', amountMicros.period)
    searchParams.append('amountMicros[operator]', amountMicros.operator)
    searchParams.append('amountMicros[value]', String(amountMicros.value))
  }

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  return searchParams
}

export async function getSupersSummaries(
  params: Params
): Promise<SupersSummariesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(`/api/supers-summaries?${searchParams.toString()}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseListSchema.parse(await res.json())
  return data.list
}

/**
 * orderByにperiodが入っており、last24Hours or それ以外
 * でcountロジックが異なるため、サーバーに渡す必要がある
 */
export async function getSupersSummariesCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/supers-summaries/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1H } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
