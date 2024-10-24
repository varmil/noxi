import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import DefaultLayout from 'components/layouts/DefaultLayout'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  unstable_setRequestLocale(locale)
  return <DefaultLayout>{children}</DefaultLayout>
}
