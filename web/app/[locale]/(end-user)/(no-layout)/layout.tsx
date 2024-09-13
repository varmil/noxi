import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: { locale: string; group: GroupString }
}

export default async function NoLayout({
  children,
  params: { locale, group }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  return <>{children}</>
}
