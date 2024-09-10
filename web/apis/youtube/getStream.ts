import { notFound } from 'next/navigation'
import { schema, StreamSchema } from 'apis/youtube/schema/streamSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getStream(id: string): Promise<StreamSchema> {
  const res = await fetchAPI(`/api/youtube/streams/${id}`, {
    // next: { revalidate: 1000 }
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  // Content-Length ヘッダーが 0 または空の場合は JSON を解析しない
  const contentLength = res.headers.get('Content-Length')
  if (!contentLength || parseInt(contentLength, 10) === 0) {
    return notFound()
  }

  const data = schema.parse(await res.json())
  return data
}
