import { z } from 'zod'
import { GroupStrings } from 'config/constants/Group'

export const cheerTicketUsageSchema = z.object({
  userId: z.number(),
  channelId: z.string(),
  group: z.enum(GroupStrings),
  usedCount: z.number(),
  usedAt: z.coerce.date()
})
export const cheerTicketUsageListSchema = z.object({
  list: z.array(cheerTicketUsageSchema)
})
export type CheerTicketUsageSchema = z.infer<typeof cheerTicketUsageSchema>
export type CheerTicketUsagesSchema = CheerTicketUsageSchema[]

// =======================================
// =======================================

export const cheeredUsageSchema = z.object({
  channelId: z.string(),
  usedCount: z.number()
})
export const cheeredUsageListSchema = z.object({
  list: z.array(cheeredUsageSchema)
})
export type CheeredUsageSchema = z.infer<typeof cheeredUsageSchema>
export type CheeredUsagesSchema = CheeredUsageSchema[]

// =======================================
// =======================================

export const fanUsageSchema = z.object({
  userId: z.number(),
  usedCount: z.number()
})
export const fanUsageListSchema = z.object({
  list: z.array(fanUsageSchema)
})
export type FanUsageSchema = z.infer<typeof fanUsageSchema>
export type FanUsagesSchema = FanUsageSchema[]

// =======================================
// =======================================

export const cheeredRankSchema = z.object({
  rank: z.number(),
  usedCount: z.number()
})
export type CheeredRankSchema = z.infer<typeof cheeredRankSchema>

// =======================================
// =======================================

export const fanRankSchema = z.object({
  rank: z.number(),
  usedCount: z.number()
})
export type FanRankSchema = z.infer<typeof fanRankSchema>
