/**
 * このファイルは例外でlocaleを「つけない」のでnext/linkを使う
 */
// eslint-disable-next-line no-restricted-imports
import { usePathname, useSearchParams } from 'next/navigation'

/** @returns 新しいパス (クエリパラメータも含む) */
export const useNewPathForLanguage = (newLocale: string) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // パスの最初の言語部分を新しい言語に置き換え
  const newPath = pathname.replace(/^\/[^/]+/, `/${newLocale}`)
  // 現在のクエリパラメータを取得
  const currentQuery = searchParams.toString()
  // クエリパラメータがある場合は、新しいパスに追加
  return currentQuery ? `${newPath}?${currentQuery}` : newPath
}
