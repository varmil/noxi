import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'
import { Footer } from 'components/footer/Footer'
import Header from 'components/header/Header'
import { LatestHyperChatsContainer } from 'components/hyper-chat/latest/LatestHyperChatsContainer'
import { HyperTrainTicker } from 'components/hyper-train/ticker/HyperTrainTicker'
import { MainContentWrapper } from 'components/layouts/MainContentWrapper'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* bottom navigation = h-16.5 */}
      <MainContentWrapper>
        <HyperTrainTicker />
        <Header className="z-30" />
        {children}
        <LatestHyperChatsContainer />
        <Footer />
      </MainContentWrapper>
      <BottomNavigation className="z-20" />
    </>
  )
}
