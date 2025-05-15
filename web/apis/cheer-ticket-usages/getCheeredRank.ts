'use server'

import {
  CheeredRankSchema,
  cheeredRankSchema
} from 'apis/cheer-ticket-usages/cheerTicketUsageSchema'
import { GroupString } from 'config/constants/Group'
import { fetchAPI } from 'lib/fetchAPI'

type Params = {
  channelId?: string
  group?: GroupString
  usedAt: {
    gte: Date
    lte?: Date
  }
}

export async function getCheeredRank({
  channelId,
  group,
  usedAt
}: Params): Promise<CheeredRankSchema | undefined> {
  const searchParams = new URLSearchParams({
    ...(channelId && { channelId }),
    ...(group && { group })
  })
  if (usedAt?.gte) {
    searchParams.append('usedAt[gte]', usedAt.gte.toISOString())
  }
  if (usedAt?.lte) {
    searchParams.append('usedAt[lte]', usedAt.lte.toISOString())
  }

  const res = await fetchAPI(
    `/api/cheer-ticket-usages/ranks/cheered?${searchParams.toString()}`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`)
  }

  const text = await res.text()
  if (!text) {
    return undefined
  } else {
    return cheeredRankSchema.parse(JSON.parse(text))
  }
}
