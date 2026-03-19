import {
  responseSchema,
  AggregatedSubscriberCountSchema
} from 'apis/channel-statistics/schema/aggregatedSubscriberCountSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getAggregatedSubscriberCounts(args: {
  channelId: string
  gte: Date
  lt: Date
  interval: string
}): Promise<AggregatedSubscriberCountSchema> {
  const params = new URLSearchParams({
    channelId: args.channelId,
    gte: args.gte.toISOString(),
    lt: args.lt.toISOString(),
    interval: args.interval
  })

  const res = await fetchAPI(
    `/api/channel-statistics/subscriber-counts?${params.toString()}`,
    { next: { revalidate: CACHE_1D } }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch AggregatedSubscriberCounts')
  }

  return responseSchema.parse(await res.json()).list
}
