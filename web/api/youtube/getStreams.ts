import { StreamsSchema, responseSchema } from 'api/youtube/schema/streamSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  status: 'scheduled' | 'live' | 'ended'
  scehduledBefore: Date
  scehduledAfter: Date
  limit: number
}

export async function getStreams({
  limit,
  scehduledBefore,
  scehduledAfter,
  ...rest
}: Params): Promise<StreamsSchema> {
  const res = await fetchAPI(
    `/api/youtube/streams?${new URLSearchParams({
      limit: String(limit),
      scheduledBefore: scehduledBefore.toISOString(),
      scheduledAfter: scehduledAfter.toISOString(),
      ...rest
    }).toString()}`,
    {
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
