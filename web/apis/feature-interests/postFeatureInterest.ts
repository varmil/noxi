'use server'

import { fetchAPI } from 'lib/fetchAPI'

export async function postFeatureInterest(data: {
  featureId: string
  comment?: string
}): Promise<void> {
  const res = await fetchAPI('/api/feature-interests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(
      `Failed to post feature interest: ${res.statusText} - ${errorText}`
    )
  }
}
