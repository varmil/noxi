import { PropsWithChildren, Suspense } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'
import { Footer } from 'components/footer/Footer'
import Header from 'components/header/Header'
import { LatestHyperChatsContainer } from 'components/hyper-chat/latest/LatestHyperChatsContainer'
import { HyperTrainListSection } from 'components/hyper-train/HyperTrainListSection'
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

        <section className="z-0 flex flex-col gap-y-8 max-w-[1185px] pt-12 pb-2 mx-auto">
          <Suspense fallback={null}>
            <HyperTrainListSection />
          </Suspense>
          <LatestHyperChatsContainer />
        </section>
        <Footer />
      </MainContentWrapper>
      <BottomNavigation className="z-20" />
    </>
  )
}
