import { ReactNode } from 'react'
import { routing } from 'config/i18n/routing'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: Promise<{
    locale: string
    group: string
  }>
}

export default async function GroupLayout(props: Props) {
  const params = await props.params

  const { group } = params

  const { children } = props

  setGroup(group as string)
  return children
}
