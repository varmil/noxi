import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import { CookieAgreeBanner } from 'components/banners/CookieAgreeBanner'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />
      <section className="z-0 relative pb-14 md:pb-4 sm:pl-14">
        {children}
      </section>
      <CookieAgreeBanner className="z-30" />
      <BottomNavigation className="z-20" />
    </>
  )
}
