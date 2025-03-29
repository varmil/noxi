'use server'

import {
  ChannelRegistrationSchema,
  schema
} from 'apis/youtube/schema/channelRegistrationSchema'
import { fetchAPI } from 'lib/fetchAPI'

type Data = {
  channelId: string
  title: string
  country: string
  language: string
  gender: 'male' | 'female' | 'nonbinary'
  group: string
  subscriberCount: number
  liveStreamCount: number
  appliedAt: string
}

export async function postChannelRegistration(
  data: Data
): Promise<ChannelRegistrationSchema | undefined> {
  const res = await fetchAPI(`/api/channel-registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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
