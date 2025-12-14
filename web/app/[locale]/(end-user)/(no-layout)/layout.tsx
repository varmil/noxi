import { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { GroupString } from 'config/constants/Group'
import { routing } from 'config/i18n/routing'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: Promise<{
    locale: string
    group?: string
  }>
}

export default async function NoLayout(props: Props) {
  const params = await props.params

  const { locale, group } = params

  const { children } = props

  // Validate that the locale is supported
  if (!routing.locales.includes(locale as any)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  // Set group only if it exists
  if (group) {
    setGroup(group as GroupString)
  }

  return <>{children}</>
}
