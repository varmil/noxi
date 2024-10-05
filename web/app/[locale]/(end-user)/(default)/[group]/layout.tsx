import { ReactNode } from 'react'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: { locale: string; group: GroupString }
}

export default async function GroupLayout({
  children,
  params: { group }
}: Props) {
  setGroup(group)
  return children
}
