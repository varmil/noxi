import {
  DayOfWeekDistributionsSchema,
  responseSchema
} from 'apis/youtube/schema/dayOfWeekDistributionSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

type Params = {
  days?: number
  group?: string
}

export async function getDayOfWeekDistribution({
  days = 28,
  group
}: Params = {}): Promise<DayOfWeekDistributionsSchema> {
  const params = new URLSearchParams()
  params.set('days', String(days))
  if (group) {
    params.set('group', group)
  }

  const res = await fetchAPI(
    `/api/youtube/day-of-week-distribution?${params.toString()}`,
    {
      next: { revalidate: CACHE_1H }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch DayOfWeekDistribution')
  }

  const data = responseSchema.parse(await res.json())
  return data.list
}
