'use server'

// 禁止ワードのリスト（実際の実装ではもっと多くの単語を含める）
const BAD_WORDS = ['admin', 'root', 'system', 'moderator', 'test']

// 既存のユーザー名のリスト（実際の実装ではデータベースから取得）
const EXISTING_USERNAMES = ['john', 'jane', 'user123', 'admin123']

export async function checkUsername(
  username: string
): Promise<{ available: boolean; message: string }> {
  // サーバー側の処理を模擬するための遅延
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 小文字に変換して比較（大文字小文字を区別しない）
  const lowercaseUsername = username.toLowerCase()

  // 既存のユーザー名との重複チェック
  if (EXISTING_USERNAMES.includes(lowercaseUsername)) {
    return {
      available: false,
      message: 'このユーザー名は既に使用されています'
    }
  }

  // 禁止ワードのチェック
  if (BAD_WORDS.some(word => lowercaseUsername.includes(word))) {
    return {
      available: false,
      message: 'このユーザー名には使用できない単語が含まれています'
    }
  }

  console.log('Username is available:', username)

  // すべてのチェックをパスした場合
  return {
    available: true,
    message: 'このユーザー名は使用可能です'
  }
}
