'use server'

import {
  progressResponseSchema,
  ProgressResponseSchema
} from 'apis/hyper-chat-tickets/ticketSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function recordProgress(): Promise<ProgressResponseSchema> {
  const res = await fetchAPI(`/api/hyper-chat-tickets/progress`, {
    method: 'POST',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to record progress: ${await res.text()}`)
  }

  return progressResponseSchema.parse(await res.json())
}
