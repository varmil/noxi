import { PropsWithChildren } from 'react'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import DefaultLayout from 'components/layouts/DefaultLayout'

type Props = {
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({
  children,
  params
}: PropsWithChildren<Props>) {
  setRequestLocale((await params).locale)
  return <DefaultLayout>{children}</DefaultLayout>
}
