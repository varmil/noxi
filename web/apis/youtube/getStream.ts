import { schema, StreamSchema } from 'apis/youtube/schema/streamSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getStream(id: string): Promise<StreamSchema> {
  const res = await fetchAPI(`/api/youtube/streams/${id}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = schema.parse(await res.json())
  return data
}
