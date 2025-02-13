import {
  SupersBundlesSchema,
  responseSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { Gender } from 'types/gender'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoIds?: string[]
  channelId?: string
  group?: GroupString
  gender?: Gender
  actualEndTimeGTE?: null
  actualEndTimeLTE?: null
  createdAtGTE?: Date
  createdAtLTE?: Date
  orderBy?: {
    field: 'amountMicros'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
}

export async function getSupersBundles({
  videoIds,
  channelId,
  group,
  gender,
  actualEndTimeGTE,
  actualEndTimeLTE,
  createdAtGTE,
  createdAtLTE,
  orderBy,
  limit,
  offset
}: Params): Promise<SupersBundlesSchema> {
  const searchParams = new URLSearchParams({
    ...(videoIds && { videoIds: [...new Set(videoIds)].join(',') }),
    ...(channelId && { channelId }),
    ...(group && { group }),
    ...(gender && { gender }),
    ...(actualEndTimeGTE === null && { actualEndTimeGTE: 'null' }),
    ...(actualEndTimeLTE === null && { actualEndTimeLTE: 'null' }),
    ...(createdAtGTE && { createdAtGTE: createdAtGTE?.toISOString() }),
    ...(createdAtLTE && { createdAtLTE: createdAtLTE?.toISOString() }),
    ...(limit && { limit: String(limit) }),
    ...(offset && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(`/api/supers-bundles?${searchParams.toString()}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
