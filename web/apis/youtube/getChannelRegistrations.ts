'use server'

import {
  ChannelRegistrationSchema,
  listSchema
} from 'apis/youtube/schema/channelRegistrationSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  status?: string
  statusNot?: string
  orderBy: {
    field: 'appliedAt'
    order: 'asc' | 'desc'
  }
  limit?: number
  offset?: number
}

export async function getChannelRegistrations({
  status,
  statusNot,
  orderBy,
  limit,
  offset
}: Params): Promise<ChannelRegistrationSchema[]> {
  const searchParams = new URLSearchParams({
    ...(status && { status }),
    ...(statusNot && { statusNot }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })
  {
    searchParams.append(`orderBy[field]`, orderBy.field)
    searchParams.append(`orderBy[order]`, orderBy.order)
  }
  const res = await fetchAPI(
    `/api/channel-registrations?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1H } }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  return listSchema.parse(await res.json()).list
}
