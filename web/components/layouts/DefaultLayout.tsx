import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import { CookieAgreeBanner } from 'components/banners/CookieAgreeBanner'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />
      <section className="relative z-0 pb-4 sm:pl-14">{children}</section>
      <CookieAgreeBanner className="z-20" />
    </>
  )
}
