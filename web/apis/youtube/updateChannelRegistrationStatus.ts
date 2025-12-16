'use server'

import { fetchAPI } from 'lib/fetchAPI'

type Status = 'pending' | 'approved' | 'rejected'

export async function updateChannelRegistrationStatus(
  channelId: string,
  data: { status: Status; group?: string }
): Promise<void> {
  const res = await fetchAPI(`/api/channel-registrations/${channelId}/status`, {
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
      `Failed to update channel registration status: ${res.statusText} - ${errorText}`
    )
  }
}
