import { ReactNode } from 'react'
import { Locale } from 'next-intl'
import { GroupString } from 'config/constants/Group'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale; group: GroupString }>
}

export default async function GroupLayout(props: Props) {
  const params = await props.params

  const { group } = params

  const { children } = props

  setGroup(group)
  return children
}
