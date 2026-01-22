import {
  GoldenTimesSchema,
  responseSchema
} from 'apis/insights/schema/goldenTimeSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
}

export async function getGoldenTimes({
  days = 28,
  group
}: Params = {}): Promise<GoldenTimesSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
  if (group) {
    params.set('group', group)
  }

  const res = await fetchAPI(`/api/insights/golden-times?${params.toString()}`, {
    next: { revalidate: CACHE_1H }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch GoldenTimes')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
