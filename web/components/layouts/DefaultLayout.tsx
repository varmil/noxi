import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* bottom navigation = h-14 なので 20 は pb-6 相当 */}
      <section className="z-0 relative pb-20 md:pb-6 sm:pl-14">
        {children}
      </section>
      {/* <CookieAgreeBanner className="z-30" /> */}
      <BottomNavigation className="z-20" />
    </>
  )
}
