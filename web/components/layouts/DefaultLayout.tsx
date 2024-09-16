import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import { CookieAgreeBanner } from 'components/banners/CookieAgreeBanner'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside />
      <section className="sm:py-4 sm:pl-14 bg-muted/40">{children}</section>
      <CookieAgreeBanner />
    </>
  )
}
