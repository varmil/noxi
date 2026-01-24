import { PropsWithChildren } from 'react'
import Aside from 'components/aside/Aside'
import BottomNavigation from 'components/bottom-navigation/BottomNavigation'
import { Footer } from 'components/footer/Footer'
import Header from 'components/header/Header'
import { MainContentWrapper } from 'components/layouts/MainContentWrapper'

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Aside className="z-10" />

      {/* bottom navigation = h-16.5 */}
      <MainContentWrapper>
        <Header className="z-30" />
        {children}
        <Footer />
      </MainContentWrapper>
      <BottomNavigation className="z-20" />
    </>
  )
}
