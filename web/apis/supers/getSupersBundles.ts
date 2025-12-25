import {
  SupersBundlesSchema,
  listSchema
} from 'apis/youtube/schema/supersBundleSchema'

import { CACHE_1D, CACHE_1H, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { roundDateToDay, roundDateToHour } from 'utils/date'

type Params = {
  videoIds?: string[]
  channelId?: string
  amountMicros?: {
    gt?: bigint
    gte?: bigint
    lt?: bigint
    lte?: bigint
  }
  group?: string
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
    ...(group && group !== 'all' && { group }),
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

export async function getSupersBundles({
  createdAtGTE,
  createdAtLTE,
  ...params
}: Params): Promise<SupersBundlesSchema> {
  // 日付パラメータを時間単位に丸めてキャッシュヒット率を向上
  const searchParams = createSearchParams({
    ...params,
    createdAtGTE: roundDateToHour(createdAtGTE),
    createdAtLTE: roundDateToHour(createdAtLTE)
  })
  const res = await fetchAPI(`/api/supers-bundles?${searchParams.toString()}`, {
    next: { revalidate: CACHE_1H }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = listSchema.parse(await res.json())
  return data.list
}

type CountParams = Pick<
  Params,
  | 'videoIds'
  | 'channelId'
  | 'amountMicros'
  | 'group'
  | 'gender'
  | 'actualEndTimeGTE'
  | 'actualEndTimeLTE'
  | 'createdAtGTE'
  | 'createdAtLTE'
>

export async function getSupersBundlesCount({
  videoIds,
  channelId,
  amountMicros,
  group,
  gender,
  actualEndTimeGTE,
  actualEndTimeLTE,
  createdAtGTE,
  createdAtLTE
}: CountParams): Promise<number> {
  // 日付パラメータを日単位に丸めてキャッシュヒット率を向上
  // limit, offset, orderBy は Count に不要なので明示的に除外
  const searchParams = createSearchParams({
    videoIds,
    channelId,
    amountMicros,
    group,
    gender,
    actualEndTimeGTE,
    actualEndTimeLTE,
    createdAtGTE: roundDateToDay(createdAtGTE),
    createdAtLTE: roundDateToDay(createdAtLTE)
  })
  const res = await fetchAPI(
    `/api/supers-bundles/count?${searchParams.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
