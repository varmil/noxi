import { CACHE_1W, fetchAPI } from 'lib/fetchAPI'

export async function getChannelsVideoCountSum(): Promise<number> {
  const res = await fetchAPI('/api/youtube/channels/video-count-sum', {
    next: { revalidate: CACHE_1W }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }
  return await res.json()
}
