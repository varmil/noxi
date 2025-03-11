import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* bottom navigation = h-14.5 なので 22.5 は pb-8 相当 */}
      <section className="z-0 relative pb-22.5 md:pb-12 sm:pl-14">
        {children}
      </section>
      {/* <CookieAgreeBanner className="z-30" /> */}
      <BottomNavigation className="z-20" />
    </>
  )
}
