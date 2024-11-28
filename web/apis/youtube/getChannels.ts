import {
  ChannelsSchema,
  responseSchema
} from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  ids?: string[]
  group?: GroupString
  orderBy?: {
    field: 'subscriberCount' | 'viewCount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

export async function getChannels({
  ids,
  group,
  orderBy,
  limit,
  offset
}: Params): Promise<ChannelsSchema> {
  const searchParams = new URLSearchParams({
    ...(ids && { ids: [...new Set(ids)].join(',') }),
    ...(group && { group }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(
    `/api/youtube/channels?${searchParams.toString()}`,
    {
      // next: { revalidate: 3600 * 12 },
      cache: 'no-cache'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
