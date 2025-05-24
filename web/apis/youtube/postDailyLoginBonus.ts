'use server'

import {
  DailyLoginBonusSchema,
  schema
} from 'apis/youtube/schema/dailyLoginBonusSchema'
import { auth } from 'lib/auth'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  userId: number
}

export async function postDailyLoginBonus(
  params: Params
): Promise<DailyLoginBonusSchema> {
  const session = await auth()
  if (!session) return { eligible: false, ticketsAwarded: 0, totalTickets: 0 }

  const res = await fetchAPI(`/api/login-bonuses/daily`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })

  if (!res.ok) {
    throw new Error(`Failed to post data: ${res.statusText}`)
  }

  return schema.parse(await res.json())
}
