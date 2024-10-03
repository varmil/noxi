import { PropsWithoutRef } from 'react'

const StreamListContentContainer = ({
  children
}: PropsWithoutRef<{
  children: React.ReactNode
}>) => {
  return <section>{children}</section>
}

export default StreamListContentContainer
