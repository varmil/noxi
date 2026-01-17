'use server'

import { fetchAPI } from 'lib/fetchAPI'

export async function deleteChannel(channelId: string): Promise<void> {
  const res = await fetchAPI(`/api/inactive-channels/${channelId}`, {
    method: 'DELETE',
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to delete channel: ${res.statusText} - ${errorText}`)
  }
}
