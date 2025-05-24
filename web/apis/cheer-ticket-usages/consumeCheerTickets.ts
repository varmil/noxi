'use server'

import { fetchAPI } from 'lib/fetchAPI'

type Data = {
  channelId: string
  group: string
  gender: string
  usedCount: number
  usedAt: Date
}

export async function consumeCheerTickets(data: Data): Promise<void> {
  const res = await fetchAPI(`/api/cheer-ticket-usages/consume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error(`Failed to consume cheer tickets: ${res.statusText}`)
  }
}
