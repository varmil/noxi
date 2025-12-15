import {
  SUPERS_SUMMARIES,
  SUPERS_SUMMARIES_HALF_HOURLY
} from 'apis/tags/revalidate-tags'
import {
  SupersSummariesSchema,
  responseListSchema
} from 'apis/youtube/schema/supersSummarySchema'

import { CACHE_12H, CACHE_1W, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { Period } from 'types/period'

type Params = {
  channelIds?: string[]
  group?: string
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
    ...(group && group !== 'all' && { group }),
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

/**
 * orderByにperiodが入っており、last24Hours or それ以外
 * でロジックが異なる。キャッシュ期間も変える
 */
export async function getSupersSummaries(
  params: Params
): Promise<SupersSummariesSchema> {
  const searchParams = createSearchParams(params)
  const cacheOption = params.orderBy?.some(
    orderBy => orderBy.field === 'last24Hours'
  )
    ? { next: { revalidate: CACHE_12H, tags: [SUPERS_SUMMARIES_HALF_HOURLY] } }
    : { next: { revalidate: CACHE_1W, tags: [SUPERS_SUMMARIES] } }

  const res = await fetchAPI(
    `/api/supers-summaries?${searchParams.toString()}`,
    cacheOption
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseListSchema.parse(await res.json())
  return data.list
}

/**
 * orderByにperiodが入っており、last24Hours or それ以外
 * でロジックが異なる。キャッシュ期間も変える
 */
export async function getSupersSummariesCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const cacheOption = params.orderBy?.some(
    orderBy => orderBy.field === 'last24Hours'
  )
    ? { next: { revalidate: CACHE_12H, tags: [SUPERS_SUMMARIES_HALF_HOURLY] } }
    : { next: { revalidate: CACHE_1W, tags: [SUPERS_SUMMARIES] } }

  const res = await fetchAPI(
    `/api/supers-summaries/count?${searchParams.toString()}`,
    cacheOption
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
