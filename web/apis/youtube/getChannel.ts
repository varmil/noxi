import { notFound } from 'next/navigation'
import { ChannelSchema, schema } from 'apis/youtube/schema/channelSchema'
import { CACHE_12H, fetchAPI } from 'lib/fetchAPI'

export async function getChannel(id: string): Promise<ChannelSchema> {
  const res = await fetchAPI(`/api/youtube/channels/${id}`, {
    next: { revalidate: CACHE_12H }
  })

  if (!res.ok) {
    // Specifically handle 404 errors
    if (res.status === 404) {
      return notFound()
    }
    // For all other errors, throw a generic error (will result in 500 status)
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const data = schema.parse(await res.json())
  return data
}
