import { AFTER_CONSUME_CHEER_TICKETS } from 'apis/tags/revalidate-tags'
import { GroupString } from 'config/constants/Group'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import {
  cheerTicketUsageListSchema,
  CheerTicketUsagesSchema
} from './cheerTicketUsageSchema'

type Params = {
  userId?: number | string
  channelId?: string
  group?: GroupString
  usedAt?: {
    gte: Date
    lte?: Date
  }
  orderBy?: {
    field: 'usedAt' | 'usedCount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

const createSearchParams = ({
  userId,
  channelId,
  group,
  usedAt,
  orderBy,
  limit,
  offset
}: Params) => {
  const searchParams = new URLSearchParams({
    ...(userId && { userId: String(userId) }),
    ...(channelId && { channelId }),
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
  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })
  return searchParams
}

export async function getCheerTicketUsages(
  params: Params
): Promise<CheerTicketUsagesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/cheer-ticket-usages?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D, tags: [AFTER_CONSUME_CHEER_TICKETS] } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = cheerTicketUsageListSchema.parse(await res.json())
  return data.list
}
