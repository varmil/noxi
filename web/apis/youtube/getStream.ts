import { notFound } from 'next/navigation'
import { responseSchema, StreamSchema } from 'apis/youtube/schema/streamSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

// Custom error class for 404 Not Found errors
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export async function getStream(id: string): Promise<StreamSchema> {
  const res = await fetchAPI(`/api/youtube/streams/${id}`, {
    next: { revalidate: CACHE_1H }
  })

  if (!res.ok) {
    // Specifically handle 404 errors
    if (res.status === 404) {
      console.log(`Stream not found: ${id}`)
      return notFound()
    }
    // For all other errors, throw a generic error (will result in 500 status)
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const data = responseSchema.parse(await res.json())
  return data
}
