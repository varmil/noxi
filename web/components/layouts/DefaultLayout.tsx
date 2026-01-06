import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* NOTE: 実験中。Adsenseをコンテンツしたにいれる場合 space-y-6 を使う */}
      {/* bottom navigation = h-14.5 なので 22.5 は pb-8 相当 */}
      <section className="z-0 relative space-y-6 pb-22.5 md:pb-12 lg:pl-[280px]">
        {children}
        {/* <div className="px-6">
          <DisplaySquareAds />
        </div> */}
      </section>
      <BottomNavigation className="z-20" />
    </>
  )
}
