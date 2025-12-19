import {
  MembershipBundleSchema,
  schema
} from 'apis/youtube/schema/membershipBundleSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getMembershipBundle(
  videoId: string
): Promise<MembershipBundleSchema | undefined> {
  const res = await fetchAPI(`/api/membership-bundles/${videoId}`, {
    next: { revalidate: CACHE_1D }
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
