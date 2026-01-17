import { fetchAPI } from 'lib/fetchAPI'
import {
  inactiveChannelsResponseSchema,
  InactiveChannelsSchema
} from './inactiveChannelSchema'

export async function getInactiveChannels(
  inactiveMonths: number
): Promise<InactiveChannelsSchema> {
  const res = await fetchAPI(
    `/api/inactive-channels?inactiveMonths=${inactiveMonths}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch inactive channels')
  }

  const data = await res.json()
  const parsed = inactiveChannelsResponseSchema.parse(data)
  return parsed.list
}
