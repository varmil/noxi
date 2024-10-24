import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string; group: GroupString }>
}

export default async function NoLayout(props: Props) {
  const params = await props.params;

  const {
    locale,
    group
  } = params;

  const {
    children
  } = props;

  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  return <>{children}</>
}
