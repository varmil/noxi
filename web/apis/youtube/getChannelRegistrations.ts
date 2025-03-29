'use server'

import {
  ChannelRegistrationSchema,
  listSchema
} from 'apis/youtube/schema/channelRegistrationSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status?: string
  orderBy: {
    field: 'appliedAt'
    order: 'asc' | 'desc'
  }
  limit?: number
  offset?: number
}

export async function getChannelRegistrations({
  status,
  orderBy,
  limit,
  offset
}: Params): Promise<ChannelRegistrationSchema[]> {
  const searchParams = new URLSearchParams({
    ...(status && { status }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })
  {
    searchParams.append(`orderBy[field]`, orderBy.field)
    searchParams.append(`orderBy[order]`, orderBy.order)
  }
  const res = await fetchAPI(
    `/api/channel-registrations?${searchParams.toString()}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  return listSchema.parse(await res.json()).list
}
