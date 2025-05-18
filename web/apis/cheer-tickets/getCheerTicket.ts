'use server'

import { fetchAPI } from 'lib/fetchAPI'
import { CheerTicketSchema, schema } from './cheerTicketSchema'

export async function getCheerTicket(): Promise<CheerTicketSchema | undefined> {
  const res = await fetchAPI(`/api/cheer-tickets/me`, {
    cache: 'no-store'
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
