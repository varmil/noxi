import { StreamsSchema, responseSchema } from 'apis/youtube/schema/streamSchema'
import { GroupString } from 'config/constants/Site'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status: 'scheduled' | 'live' | 'ended'
  group?: GroupString
  scheduledBefore?: Date
  scheduledAfter?: Date
  orderBy: {
    field:
      | 'scheduledStartTime'
      | 'actualStartTime'
      | 'actualEndTime'
      | 'maxViewerCount'
    order: 'asc' | 'desc'
  }[]
  limit: number
}

export async function getStreams({
  status,
  group,
  scheduledBefore,
  scheduledAfter,
  orderBy,
  limit
}: Params): Promise<StreamsSchema> {
  const searchParams = new URLSearchParams({
    status,
    limit: String(limit),
    ...(group && { group }),
    ...(scheduledBefore && { scheduledBefore: scheduledBefore.toISOString() }),
    ...(scheduledAfter && { scheduledAfter: scheduledAfter.toISOString() })
  })

  orderBy.forEach((orderBy, index) => {
    searchParams.append(`orderBy[${index}][field]`, orderBy.field)
    searchParams.append(`orderBy[${index}][order]`, orderBy.order)
  })

  const res = await fetchAPI(
    `/api/youtube/streams?${searchParams.toString()}`,
    { cache: 'no-store' }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
