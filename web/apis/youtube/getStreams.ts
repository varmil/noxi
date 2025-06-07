import {
  StreamsSchema,
  responseListSchema
} from 'apis/youtube/schema/streamSchema'
import { GroupString } from 'config/constants/Group'
import { fetchAPI } from 'lib/fetchAPI'
import { Gender } from 'types/gender'

type Params = {
  title?: string
  status?: 'scheduled' | 'live' | 'ended'
  videoIds?: string[]
  group?: GroupString
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
  ...params
}: Params): Promise<StreamsSchema> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/youtube/streams?${searchParams.toString()}`,
    { ...(revalidate && { next: { revalidate } }) }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  const data = responseListSchema.parse(await res.json())
  return data.list
}

export async function getStreamsCount({
  revalidate,
  ...params
}: Omit<Params, 'limit' | 'offset' | 'orderBy'>): Promise<number> {
  const searchParams = createSearchParams(params)
  const res = await fetchAPI(
    `/api/youtube/streams/count?${searchParams.toString()}`,
    { ...(revalidate && { next: { revalidate } }) }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
