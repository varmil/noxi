'use client'
/**
 * このファイルは例外でlocaleを「つけない」のでnext/linkを使う
 */

// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useNewPathForLanguage } from 'components/language-switcher/utils/language-switcher'

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <LanguageButton locale="ja">JP</LanguageButton>
      <span className="text-muted-foreground">|</span>
      <LanguageButton locale="en">EN</LanguageButton>
    </div>
  )
}

const LanguageButton = ({
  children,
  locale
}: {
  children: React.ReactNode
  locale: string
}) => {
  const currentLocale = useLocale()
  const isActive = currentLocale === locale
  const href = useNewPathForLanguage(locale)

  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className={`h-auto! px-1 py-0.5 font-light ${
        isActive ? 'font-semibold border-b-2 border-primary rounded-none' : ''
      }`}
    >
      <Link href={href} prefetch={false}>
        {children}
      </Link>
    </Button>
  )
}
