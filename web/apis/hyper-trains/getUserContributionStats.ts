'use server'

import { z } from 'zod'
import { fetchAPI } from 'lib/fetchAPI'

const statsSchema = z.object({
  participationCount: z.number(),
  topContributorCount: z.number(),
  totalPoint: z.number(),
  mostContributedChannelId: z.string().nullable(),
  mostContributedChannelPoint: z.number()
})

type UserContributionStatsSchema = z.infer<typeof statsSchema>

/** User Profile ページ専用 API */
export async function getUserContributionStats(
  userId: number
): Promise<UserContributionStatsSchema> {
  const res = await fetchAPI(
    `/api/hyper-trains/contributions/users/${userId}/stats`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch contribution stats: ${await res.text()}`)
  }
  return statsSchema.parse(await res.json())
}
