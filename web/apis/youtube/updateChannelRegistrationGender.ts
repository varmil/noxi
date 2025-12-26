'use server'

import { fetchAPI } from 'lib/fetchAPI'

type Gender = 'male' | 'female'

export async function updateChannelRegistrationGender(
  channelId: string,
  data: { gender: Gender }
): Promise<void> {
  const res = await fetchAPI(`/api/channel-registrations/${channelId}/gender`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(
      `Failed to update channel registration gender: ${res.statusText} - ${errorText}`
    )
  }
}
