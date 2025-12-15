'use client'

/**
 * このファイルは例外でlocaleを「つけない」のでnext/linkを使う
 */

// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'
import { useNewPathForLanguage } from 'components/language-switcher/utils/language-switcher'

export default function LanguageLink({
  children,
  locale
}: {
  children: React.ReactNode
  locale: string
}) {
  return (
    <Link href={useNewPathForLanguage(locale)} prefetch={false}>
      {children}
    </Link>
  )
}
