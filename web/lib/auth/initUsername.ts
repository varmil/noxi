import { randomUUID } from 'crypto'
import { Pool } from '@neondatabase/serverless'
import { generateUsername } from 'unique-username-generator'

export async function initUsername(pool: Pool, userId: string) {
  const username = await randomUsername(pool)
  await pool.query(
    'INSERT INTO "UserProfile" ("userId", "username", "description") VALUES ($1, $2, $3)',
    [userId, username, '']
  )
}

async function randomUsername(pool: Pool) {
  for (let i = 0; i < 10; i++) {
    const candidate = generateUsername('_', 3, 18)
    const { rowCount } = await pool.query(
      'SELECT 1 FROM "UserProfile" WHERE "username" = $1',
      [candidate]
    )
    if (rowCount === 0) {
      return candidate
    }
  }
  // 10回失敗したらUUID fallback
  return `user_${randomUUID().slice(0, 8)}`
}
