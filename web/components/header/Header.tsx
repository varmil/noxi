import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import HeaderAuth from 'components/header/HeaderAuth'
import HeaderAuthSkeleton from 'components/header/HeaderAuthSkeleton'
import HeaderNavigationMenuSkeleton from 'components/header/sm/HeaderNavigationMenuSkeleton'
import HeaderNavigationMenuWrapper from 'components/header/sm/HeaderNavigationMenuWrapper'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import { PageSMPX } from 'components/page'
import VChartsText from 'components/vcharts/svg/text'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default async function Header({ className }: { className?: string }) {
  const global = await getTranslations('Global')

  const bgFilter = 'backdrop-blur-sm supports-backdrop-filter:bg-background/70'
  const sm = `${PageSMPX}`

  return (
    <header
      className={`sticky top-0 flex h-14 items-center gap-4 border-b border-dotted border-border-variant bg-background px-1.5 pr-4 ${bgFilter} ${sm} ${
        className ?? ''
      }`}
    >
      <HeaderXSSheet />

      <Link
        href="/"
        className="flex items-center gap-1 transition-all hover:scale-105"
        prefetch={false}
      >
        <Logo className="size-6" />
        <VChartsText />
        <div className="sr-only">{global('title')}</div>
      </Link>

      <Suspense fallback={<HeaderNavigationMenuSkeleton />}>
        <HeaderNavigationMenuWrapper />
      </Suspense>

      <Suspense fallback={<HeaderAuthSkeleton />}>
        <HeaderAuth />
      </Suspense>
    </header>
  )
}
