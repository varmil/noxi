'use client'
/**
 * このファイルは例外でlocaleを「つけない」のでnext/linkを使う
 */

// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'
// eslint-disable-next-line no-restricted-imports
import { usePathname, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useLocale()

  const createPathForLanguage = (newLocale: string) => {
    // パスの最初の言語部分を新しい言語に置き換え
    const newPath = pathname.replace(/^\/[^/]+/, `/${newLocale}`)
    // 現在のクエリパラメータを取得
    const currentQuery = searchParams.toString()
    // クエリパラメータがある場合は、新しいパスに追加
    return currentQuery ? `${newPath}?${currentQuery}` : newPath
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Button
        asChild
        variant="ghost"
        className={`h-auto px-1 py-0.5 font-light ${
          locale === 'ja'
            ? 'font-semibold border-b-2 border-primary rounded-none'
            : ''
        }`}
      >
        <Link href={createPathForLanguage('ja')}>JP</Link>
      </Button>
      <span className="text-muted-foreground">|</span>
      <Button
        asChild
        variant="ghost"
        className={`h-auto px-1 py-0.5 font-light ${
          locale === 'en'
            ? 'font-semibold border-b-2 border-primary rounded-none'
            : ''
        }`}
      >
        <Link href={createPathForLanguage('en')}>EN</Link>
      </Button>
    </div>
  )
}
