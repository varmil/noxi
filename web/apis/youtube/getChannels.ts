import {
  ChannelsSchema,
  responseSchema
} from 'apis/youtube/schema/channelSchema'

import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'

type Params = {
  ids?: string[]
  title?: string
  group?: string
  gender?: Gender
  orderBy?: {
    field: 'subscriberCount' | 'viewCount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

export async function getChannels({
  ids,
  title,
  group,
  gender,
  orderBy,
  limit,
  offset
}: Params): Promise<ChannelsSchema> {
  const searchParams = new URLSearchParams({
    ...(ids && { ids: [...new Set(ids)].join(',') }),
    ...(title && { title }),
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(
    `/api/youtube/channels?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}

export async function getChannelsCount({
  group,
  gender
}: Omit<Params, 'ids' | 'limit' | 'offset' | 'orderBy'>): Promise<number> {
  const searchParams = new URLSearchParams({
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender })
  })
  const res = await fetchAPI(
    `/api/youtube/channels/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
