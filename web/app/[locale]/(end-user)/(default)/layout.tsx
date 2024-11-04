import { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import DefaultLayout from 'components/layouts/DefaultLayout'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  setRequestLocale(locale)
  return <DefaultLayout>{children}</DefaultLayout>
}
