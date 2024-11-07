import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import { CookieAgreeBanner } from 'components/banners/CookieAgreeBanner'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />
      <section className="relative z-0 sm:pb-4 sm:pl-14 bg-muted/40">
        {children}
      </section>
      <CookieAgreeBanner className="z-20" />
    </>
  )
}
