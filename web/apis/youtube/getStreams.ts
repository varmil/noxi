import { StreamsSchema, responseSchema } from 'apis/youtube/schema/streamSchema'
import { Gender } from 'config/constants/Gender'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status?: 'scheduled' | 'live' | 'ended'
  videoIds?: string[]
  group?: GroupString
  gender?: Gender
  channelId?: string
  scheduledBefore?: Date
  scheduledAfter?: Date
  endedBefore?: Date
  endedAfter?: Date
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
  revalidate?: number
}

export async function getStreams({
  status,
  videoIds,
  group,
  gender,
  channelId,
  scheduledBefore,
  scheduledAfter,
  endedBefore,
  endedAfter,
  orderBy,
  limit,
  offset,
  revalidate
}: Params): Promise<StreamsSchema> {
  const searchParams = new URLSearchParams({
    ...(status && { status }),
    ...(videoIds && { videoIds: [...new Set(videoIds)].join(',') }),
    ...(group && { group }),
    ...(gender && { gender }),
    ...(channelId && { channelId }),
    ...(scheduledBefore && { scheduledBefore: scheduledBefore.toISOString() }),
    ...(scheduledAfter && { scheduledAfter: scheduledAfter.toISOString() }),
    ...(endedBefore && { endedBefore: endedBefore.toISOString() }),
    ...(endedAfter && { endedAfter: endedAfter.toISOString() }),
    ...(limit !== undefined && { limit: String(limit) }),
    ...(offset !== undefined && { offset: String(offset) })
  })

  orderBy?.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(
    `/api/youtube/streams?${searchParams.toString()}`,
    { ...(revalidate && { next: { revalidate } }) }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
