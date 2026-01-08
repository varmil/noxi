import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'
import { Footer } from 'components/footer/Footer'
import { MainContentWrapper } from 'components/layouts/MainContentWrapper'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* NOTE: 実験中。Adsenseをコンテンツしたにいれる場合 space-y-6 を使う */}
      {/* bottom navigation = h-14.5 */}
      <MainContentWrapper>
        {children}
        {/* <div className="px-6">
          <DisplaySquareAds />
        </div> */}
        <Footer />
      </MainContentWrapper>
      <BottomNavigation className="z-20" />
    </>
  )
}
