import { StreamsSchema, responseSchema } from 'api/youtube/schema/streamSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status: 'scheduled' | 'live' | 'ended'
  scehduledBefore?: Date
  scehduledAfter?: Date
  orderBy: {
    field: 'scheduledStartTime' | 'actualStartTime' | 'actualEndTime'
    order: 'asc' | 'desc'
  }[]
  limit: number
}

export async function getStreams({
  status,
  scehduledBefore,
  scehduledAfter,
  orderBy,
  limit
}: Params): Promise<StreamsSchema> {
  const searchParams = new URLSearchParams({
    status,
    limit: String(limit)
  })
  if (scehduledBefore)
    searchParams.append('scheduledBefore', scehduledBefore.toISOString())
  if (scehduledAfter)
    searchParams.append('scehduledAfter', scehduledAfter.toISOString())

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
  console.log(data.list.length)
  return data.list
}
