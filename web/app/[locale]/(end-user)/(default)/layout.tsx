import { ReactNode } from 'react'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import DefaultLayout from 'components/layouts/DefaultLayout'

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout(props: Props) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  setRequestLocale(locale)
  return <DefaultLayout>{children}</DefaultLayout>
}
