import { Pool } from '@neondatabase/serverless'
import { normalizeEmail } from 'lib/auth/normalizeEmail'

/** normalizedEmail カラムを更新（エイリアス対策用） */
export async function initNormalizedEmail(
  pool: Pool,
  userId: string,
  email: string
) {
  const normalizedEmailValue = normalizeEmail(email)
  await pool.query(`UPDATE users SET "normalizedEmail" = $1 WHERE id = $2`, [
    normalizedEmailValue,
    userId
  ])
}
