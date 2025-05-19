'use server'

import { neon } from '@neondatabase/serverless'

// 既存のユーザー名のリスト（実際の実装ではデータベースから取得）
const EXISTING_USERNAMES = ['john', 'jane', 'user123', 'admin123']

export async function checkUsername(
  username: string
): Promise<{ available: boolean; message: string }> {
  const sql = neon(process.env.DATABASE_URL)

  // 既存のユーザー名との重複チェック
  const result =
    await sql`SELECT 1 FROM "UserProfile" WHERE "username" = ${username}`
  if (result.length > 0) {
    return {
      available: false,
      message: 'このユーザー名は既に使用されています'
    }
  }

  console.log('Username is available:', username)

  // すべてのチェックをパスした場合
  return {
    available: true,
    message: 'このユーザー名は使用可能です'
  }
}
