import { StreamsSchema, responseSchema } from 'api/youtube/schema/streamSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status: 'scheduled' | 'live' | 'ended'
  scehduledBefore: Date
  scehduledAfter: Date
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
    scheduledBefore: scehduledBefore.toISOString(),
    scheduledAfter: scehduledAfter.toISOString(),
    limit: String(limit)
  })
  orderBy.forEach((orderBy, index) => {
    searchParams.append(`orderBy[0][field]`, orderBy.field)
    searchParams.append(`orderBy[0][order]`, orderBy.order)
    // searchParams.append(
    //   `orderBy[]`,
    //   new URLSearchParams({
    //     field: orderBy.field,
    //     order: orderBy.order
    //   }).toString()
    // )
  })

  console.log('searchParams', searchParams.toString())

  const res = await fetchAPI(
    `/api/youtube/streams?${searchParams.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 600 }
    }
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
