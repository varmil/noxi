import { z } from 'zod'

/** @deprecated 応援機能は削除予定. ハイパーチャットへ移行 */
export const schema = z.object({
  eligible: z.boolean(),
  ticketsAwarded: z.number().min(0),
  totalTickets: z.number().min(0)
})

/** @deprecated 応援機能は削除予定. ハイパーチャットへ移行 */
export type DailyLoginBonusSchema = z.infer<typeof schema>
