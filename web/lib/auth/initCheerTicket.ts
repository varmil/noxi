import { Pool } from '@neondatabase/serverless'

// 付与枚数
const ADD_COUNT = 5
// NOTE: デイリーログインボーナスを貰えるようにここは過去の日付に設定
const LAST_CLAIMED_AT = '2025-01-01T00:00:00.000Z'

/** 新規登録完了時にX枚のチケットを付与するロジック */
export async function initCheerTicket(pool: Pool, userId: string) {
  await pool.query(
    `
    INSERT INTO "CheerTicket" ("userId", "totalCount", "lastClaimedAt")
    VALUES ($1, $2, $3)
    ON CONFLICT ("userId") DO UPDATE
      SET "totalCount" = "CheerTicket"."totalCount" + EXCLUDED."totalCount",
          "lastClaimedAt" = EXCLUDED."lastClaimedAt"
    `,
    [userId, ADD_COUNT, LAST_CLAIMED_AT]
  )
}
