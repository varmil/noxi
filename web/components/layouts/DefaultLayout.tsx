import { PropsWithChildren } from 'react'
import DisplaySquareAds from 'components/ads/DisplaySquareAds'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* NOTE: 実験中。Adsenseをコンテンツしたにいれる場合 space-y-6 を使う */}
      {/* bottom navigation = h-14.5 なので 20.5 は pb-6 相当 */}
      <section className="z-0 relative space-y-6 pb-20.5 md:pb-8 sm:pl-14">
        {children}
        <DisplaySquareAds />
      </section>
      {/* <CookieAgreeBanner className="z-30" /> */}
      <BottomNavigation className="z-20" />
    </>
  )
}
