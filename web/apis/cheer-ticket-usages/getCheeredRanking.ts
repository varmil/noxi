import { GroupString } from 'config/constants/Group'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'
import {
  CheeredUsagesSchema,
  cheeredUsageListSchema
} from './cheerTicketUsageSchema'

type Params = {
  group?: GroupString
  usedAt?: {
    gte: Date
    lte?: Date
  }
  limit?: number
  offset?: number
}

const createSearchParams = ({ group, usedAt, limit, offset }: Params) => {
  const searchParams = new URLSearchParams({
    ...(group && { group }),
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

export async function getCheeredRanking(
  params: Params
): Promise<CheeredUsagesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/cheer-ticket-usages/rankings/cheered?${searchParams.toString()}`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = cheeredUsageListSchema.parse(await res.json())
  return data.list
}

export async function getCheeredRankingCount(
  params: Omit<Params, 'limit' | 'offset'>
): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/cheer-ticket-usages/rankings/cheered/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1H } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
