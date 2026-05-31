'use server'

import {
  ChannelRegistrationSchema,
  schema
} from 'apis/youtube/schema/channelRegistrationSchema'
import { CACHE_1H, fetchAPI } from 'lib/fetchAPI'

export async function getChannelRegistration(
  id: string
): Promise<ChannelRegistrationSchema | undefined> {
  const res = await fetchAPI(`/api/channel-registrations/${id}`, {
    next: { revalidate: CACHE_1H }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return schema.parse(JSON.parse(text))
  }
}
