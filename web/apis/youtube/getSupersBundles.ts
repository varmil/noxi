import {
  SupersBundlesSchema,
  responseSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  videoIds?: string[]
  channelId?: string
  group?: GroupString
  actualEndTimeGTE?: Date | null
  actualEndTimeLTE?: Date | null
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
  actualEndTimeGTE,
  actualEndTimeLTE,
  orderBy,
  limit,
  offset
}: Params): Promise<SupersBundlesSchema> {
  const searchParams = new URLSearchParams({
    ...(videoIds && { videoIds: [...new Set(videoIds)].join(',') }),
    ...(channelId && { channelId }),
    ...(group && { group }),
    ...(actualEndTimeGTE !== undefined && {
      actualEndTimeGTE: actualEndTimeGTE?.toISOString() ?? 'null'
    }),
    ...(actualEndTimeLTE !== undefined && {
      actualEndTimeLTE: actualEndTimeLTE?.toISOString() ?? 'null'
    }),
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
