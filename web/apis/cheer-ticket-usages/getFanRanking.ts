import { AFTER_CONSUME_CHEER_TICKETS } from 'apis/tags/revalidate-tags'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { FanUsagesSchema, fanUsageListSchema } from './cheerTicketUsageSchema'

type Params = {
  channelId?: string
  group?: string
  gender?: Gender
  usedAt?: {
    gte: Date
    lte?: Date
  }
  limit?: number
  offset?: number
}

const createSearchParams = ({
  channelId,
  group,
  gender,
  usedAt,
  limit,
  offset
}: Params) => {
  const searchParams = new URLSearchParams({
    ...(channelId && { channelId }),
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })
  if (usedAt?.gte) {
    searchParams.append('usedAt[gte]', usedAt.gte.toISOString())
  }
  if (usedAt?.lte) {
    searchParams.append('usedAt[lte]', usedAt.lte.toISOString())
  }
  return searchParams
}

export async function getFanRanking(params: Params): Promise<FanUsagesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/cheer-ticket-usages/rankings/fan?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [AFTER_CONSUME_CHEER_TICKETS] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = fanUsageListSchema.parse(await res.json())
  return data.list
}

export async function getFanRankingCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/cheer-ticket-usages/rankings/fan/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [AFTER_CONSUME_CHEER_TICKETS] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
