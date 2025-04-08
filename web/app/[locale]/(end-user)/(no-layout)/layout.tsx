import { ReactNode } from 'react'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { GroupString } from 'config/constants/Group'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale; group: GroupString }>
}

export default async function NoLayout(props: Props) {
  const params = await props.params

  const { locale, group } = params

  const { children } = props

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  return <>{children}</>
}
