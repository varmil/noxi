import {
  StreamsSchema,
  responseListSchema
} from 'apis/youtube/schema/streamSchema'

import { CACHE_1D, CACHE_1H, fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { roundDateTo10Minutes, roundDateToHour } from 'utils/date'

type Params = {
  title?: string
  status?: 'scheduled' | 'live' | 'ended'
  videoIds?: string[]
  group?: string
  gender?: Gender
  channelId?: string
  scheduledBefore?: Date | null
  scheduledAfter?: Date | null
  endedBefore?: Date | null
  endedAfter?: Date | null
  peakConcurrentViewers?: { gte?: number; lte?: number }
  avgConcurrentViewers?: { gte?: number; lte?: number }
  orderBy?: {
    field:
      | 'videoId'
      | 'scheduledStartTime'
      | 'actualStartTime'
      | 'actualEndTime'
      | 'maxViewerCount'
    order: 'asc' | 'desc'
  }[]
  limit?: number
  offset?: number
  /** cache */
  revalidate?: number
}

const createSearchParams = ({
  title,
  status,
  videoIds,
  group,
  gender,
  channelId,
  scheduledBefore,
  scheduledAfter,
  endedBefore,
  endedAfter,
  peakConcurrentViewers,
  avgConcurrentViewers,
  orderBy,
  limit,
  offset
}: Params) => {
  const searchParams = new URLSearchParams({
    ...(title && { title }),
    ...(status && { status }),
    ...(videoIds && { videoIds: [...new Set(videoIds)].join(',') }),
    ...(group && group !== 'all' && { group }),
    ...(gender && { gender }),
    ...(channelId && { channelId }),
    ...(scheduledBefore !== undefined && {
      scheduledBefore: scheduledBefore?.toISOString() ?? 'null'
    }),
    ...(scheduledAfter !== undefined && {
      scheduledAfter: scheduledAfter?.toISOString() ?? 'null'
    }),
    ...(endedBefore !== undefined && {
      endedBefore: endedBefore?.toISOString() ?? 'null'
    }),
    ...(endedAfter !== undefined && {
      endedAfter: endedAfter?.toISOString() ?? 'null'
    }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  if (peakConcurrentViewers) {
    const { gte, lte } = peakConcurrentViewers
    gte && searchParams.append('peakConcurrentViewers[gte]', String(gte))
    lte && searchParams.append('peakConcurrentViewers[lte]', String(lte))
  }

  if (avgConcurrentViewers) {
    const { gte, lte } = avgConcurrentViewers
    gte && searchParams.append('avgConcurrentViewers[gte]', String(gte))
    lte && searchParams.append('avgConcurrentViewers[lte]', String(lte))
  }

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  return searchParams
}

export async function getStreams({
  revalidate,
  scheduledBefore,
  scheduledAfter,
  endedBefore,
  endedAfter,
  ...params
}: Params): Promise<StreamsSchema> {
  // 日付パラメータを10分単位に丸めてキャッシュヒット率を向上
  const searchParams = createSearchParams({
    ...params,
    scheduledBefore: roundDateTo10Minutes(scheduledBefore),
    scheduledAfter: roundDateTo10Minutes(scheduledAfter),
    endedBefore: roundDateTo10Minutes(endedBefore),
    endedAfter: roundDateTo10Minutes(endedAfter)
  })
  const res = await fetchAPI(
    `/api/youtube/streams?${searchParams.toString()}`,
    { next: { revalidate: revalidate ?? CACHE_1H } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseListSchema.parse(await res.json())
  return data.list
}

type CountParams = Pick<
  Params,
  | 'title'
  | 'status'
  | 'videoIds'
  | 'group'
  | 'gender'
  | 'channelId'
  | 'scheduledBefore'
  | 'scheduledAfter'
  | 'endedBefore'
  | 'endedAfter'
  | 'peakConcurrentViewers'
  | 'avgConcurrentViewers'
  | 'revalidate'
>

export async function getStreamsCount({
  revalidate,
  title,
  status,
  videoIds,
  group,
  gender,
  channelId,
  scheduledBefore,
  scheduledAfter,
  endedBefore,
  endedAfter,
  peakConcurrentViewers,
  avgConcurrentViewers
}: CountParams): Promise<number> {
  // 日付パラメータを時間単位に丸めてキャッシュヒット率を向上
  // limit, offset, orderBy は Count に不要なので明示的に除外
  const searchParams = createSearchParams({
    title,
    status,
    videoIds,
    group,
    gender,
    channelId,
    scheduledBefore: roundDateToHour(scheduledBefore),
    scheduledAfter: roundDateToHour(scheduledAfter),
    endedBefore: roundDateToHour(endedBefore),
    endedAfter: roundDateToHour(endedAfter),
    peakConcurrentViewers,
    avgConcurrentViewers
  })
  const res = await fetchAPI(
    `/api/youtube/streams/count?${searchParams.toString()}`,
    { next: { revalidate: revalidate ?? CACHE_1D } }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
