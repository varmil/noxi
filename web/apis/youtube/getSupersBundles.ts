import {
  SupersBundlesSchema,
  listSchema
} from 'apis/youtube/schema/supersBundleSchema'
import { GroupString } from 'config/constants/Group'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'

type Params = {
  videoIds?: string[]
  channelId?: string
  amountMicros?: {
    gt?: bigint
    gte?: bigint
    lt?: bigint
    lte?: bigint
  }
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

const createSearchParams = ({
  videoIds,
  channelId,
  amountMicros,
  group,
  gender,
  actualEndTimeGTE,
  actualEndTimeLTE,
  createdAtGTE,
  createdAtLTE,
  orderBy,
  limit,
  offset
}: Params) => {
  const searchParams = new URLSearchParams({
    ...(videoIds && { videoIds: [...new Set(videoIds)].join(',') }),
    ...(channelId && { channelId }),
    ...(group && { group }),
    ...(gender && { gender }),
    ...(actualEndTimeGTE === null && { actualEndTimeGTE: 'null' }),
    ...(actualEndTimeLTE === null && { actualEndTimeLTE: 'null' }),
    ...(createdAtGTE && { createdAtGTE: createdAtGTE?.toISOString() }),
    ...(createdAtLTE && { createdAtLTE: createdAtLTE?.toISOString() }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  if (amountMicros) {
    const { gt, gte, lt, lte } = amountMicros
    gt && searchParams.append('amountMicros[gt]', String(gt))
    gte && searchParams.append('amountMicros[gte]', String(gte))
    lt && searchParams.append('amountMicros[lt]', String(lt))
    lte && searchParams.append('amountMicros[lte]', String(lte))
  }

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  return searchParams
}

export async function getSupersBundles(
  params: Params
): Promise<SupersBundlesSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(`/api/supers-bundles?${searchParams.toString()}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = listSchema.parse(await res.json())
  return data.list
}

export async function getSupersBundlesCount({
  ...params
}: Omit<Params, 'limit' | 'offset' | 'orderBy'>): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/supers-bundles/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
