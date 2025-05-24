'use server'

import { neon } from '@neondatabase/serverless'

export async function checkUsername(
  username: string
): Promise<{ available: boolean }> {
  const sql = neon(process.env.DATABASE_URL)

  const result =
    await sql`SELECT 1 FROM "UserProfile" WHERE "username" = ${username}`
  if (result.length > 0) {
    return {
      available: false
    }
  }

  return {
    available: true
  }
}
