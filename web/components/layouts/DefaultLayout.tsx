import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import { CookieAgreeBanner } from 'components/banners/CookieAgreeBanner'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16 bg-muted/40">
        {children}
      </div>
      <CookieAgreeBanner />
    </>
  )
}
