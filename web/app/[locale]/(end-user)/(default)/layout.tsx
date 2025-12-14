import { PropsWithChildren } from 'react'
import { setRequestLocale } from 'next-intl/server'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { routing } from 'config/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params
}: PropsWithChildren<Props>) {
  const { locale } = await params

  // Validate that the locale is supported
  if (!routing.locales.includes(locale as any)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  setRequestLocale(locale as 'ja' | 'en')
  return <DefaultLayout>{children}</DefaultLayout>
}
