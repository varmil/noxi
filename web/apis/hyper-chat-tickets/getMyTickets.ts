'use server'

import {
  ticketsResponseSchema,
  TicketsSchema
} from 'apis/hyper-chat-tickets/ticketSchema'
import { fetchAPI } from 'lib/fetchAPI'

export async function getMyTickets(): Promise<TicketsSchema> {
  const res = await fetchAPI(`/api/hyper-chat-tickets/me`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to get tickets: ${await res.text()}`)
  }

  const data = ticketsResponseSchema.parse(await res.json())
  return data.list
}
