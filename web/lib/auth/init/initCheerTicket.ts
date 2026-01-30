import { Pool } from '@neondatabase/serverless'

// 付与枚数
const ADD_COUNT = 5
// NOTE: デイリーログインボーナスを貰えるようにここは過去の日付に設定
const LAST_CLAIMED_AT = '2025-01-01T00:00:00.000Z'

/**
 * 新規登録完了時にX枚のチケットを付与するロジック
 *
 * エイリアス対策: 同じ normalizedEmail を持つユーザーが既にチケットを
 * 受け取っている場合は付与しない（Sybil攻撃対策）
 */
export async function initCheerTicket(pool: Pool, userId: string) {
  // 同じ normalizedEmail を持つユーザーが既にチケットを受け取っているか確認
  const checkResult = await pool.query(
    `
    SELECT ct."userId"
    FROM "CheerTicket" ct
    INNER JOIN users u ON ct."userId" = u.id::text
    INNER JOIN users target_user ON target_user.id = $1::integer
    WHERE u."normalizedEmail" = target_user."normalizedEmail"
    LIMIT 1
    `,
    [userId]
  )

  // 既に同じ normalizedEmail のユーザーがチケットを持っている場合はスキップ
  if (checkResult.rowCount !== null && checkResult.rowCount > 0) {
    console.log(
      `[initCheerTicket] Skipping ticket distribution for userId=${userId}: duplicate normalizedEmail detected`
    )
    return
  }

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
