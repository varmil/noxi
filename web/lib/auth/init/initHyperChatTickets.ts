import { Pool } from '@neondatabase/serverless'

/**
 * 新規登録時にハイパーチャットチケットを配布（3枚）
 * - 同じ normalizedEmail で既に signup ボーナスを受け取っている場合はスキップ
 * - 30日間有効
 */
export async function initHyperChatTickets(
  pool: Pool,
  userId: string,
  normalizedEmail: string
) {
  // 1. 同じ normalizedEmail で signup ボーナス受領済みかチェック
  const existing = await pool.query(
    `SELECT 1 FROM "HyperChatTicket" t
     JOIN "users" u ON t."userId" = u.id
     WHERE u."normalizedEmail" = $1 AND t."sourceType" = 'signup'
     LIMIT 1`,
    [normalizedEmail]
  )

  if (existing.rows.length > 0) {
    // 既存ユーザー（エイリアスアカウント）なのでスキップ
    return
  }

  // 2. 30日後の有効期限で3枚配布
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  await pool.query(
    `INSERT INTO "HyperChatTicket" ("userId", "expiresAt", "sourceType")
     SELECT $1, $2, 'signup' FROM generate_series(1, 3)`,
    [userId, expiresAt.toISOString()]
  )
}
