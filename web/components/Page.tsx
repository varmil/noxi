import type { PropsWithChildren } from 'react'
import Header from './Header'

export default function Page({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
