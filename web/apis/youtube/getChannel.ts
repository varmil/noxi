'use server'

import { notFound } from 'next/navigation'
import { ChannelSchema, schema } from 'apis/youtube/schema/channelSchema'
import { CACHE_1D, fetchAPI } from 'lib/fetchAPI'

export async function getChannel(id: string): Promise<ChannelSchema> {
  const res = await fetchAPI(`/api/youtube/channels/${id}`, {
    next: { revalidate: CACHE_1D }
  })

  if (!res.ok) {
    // Specifically handle 404 errors
    if (res.status === 404) {
      console.log(`Channel not found: ${id}`)
      return notFound()
    }
    // For all other errors, throw a generic error (will result in 500 status)
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const data = schema.parse(await res.json())
  return data
}

/** 指定したチャンネルIDのチャンネルが存在するかどうかを判定 */
export async function existsChannel(id: string): Promise<boolean> {
  const res = await fetchAPI(`/api/youtube/channels/${id}`, {
    next: { revalidate: CACHE_1D }
  })
  if (!res.ok) {
    if (res.status === 404) {
      return false
    }
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }
  return true
}
