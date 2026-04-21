import {
  SupersBundleSchema,
  schema
} from 'apis/youtube/schema/supersBundleSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

export async function getSupersBundle(
  videoId: string
): Promise<SupersBundleSchema | undefined> {
  const res = await fetchAPI(`/api/supers-bundles/${videoId}`, {
    next: { revalidate: CACHE_1H }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${await res.text()}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return schema.parse(JSON.parse(text))
  }
}
