import Header from './Header'
import type { PropsWithChildren } from 'react'

export default function Page({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
