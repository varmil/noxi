'use server'

import { utapi } from 'utils/uploadthing/server'

export async function deleteOldImage(url?: string): Promise<void> {
  if (!url) return

  const u = new URL(url)

  // ufs.sh 以外のドメインなら何もしないで終了
  if (!u.hostname.endsWith('ufs.sh')) return

  // パスの最後の部分（例: /f/YEBH9cK... の YEBH9cK... を取得）
  const parts = u.pathname.split('/')
  const key = parts[parts.length - 1]
  if (!key) return

  console.time(`deleteOldImage:${key}`)
  try {
    await utapi.deleteFiles(key)
  } catch (e) {
    console.error('[deleteOldImage] Failed to parse or delete:', e)
  } finally {
    console.timeEnd(`deleteOldImage:${key}`)
  }
}
