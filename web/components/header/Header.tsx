import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import HeaderAuth from 'components/header/HeaderAuth'
import HeaderAuthSkeleton from 'components/header/HeaderAuthSkeleton'
import HeaderNavigationMenuSkeleton from 'components/header/sm/HeaderNavigationMenuSkeleton'
import HeaderNavigationMenuWrapper from 'components/header/sm/HeaderNavigationMenuWrapper'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import { SidebarToggleButton } from 'components/sidebar/SidebarToggleButton'
import VChartsText from 'components/vcharts/svg/text'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Header({ className }: { className?: string }) {
  const global = useTranslations('Global')
  const bgFilter = 'backdrop-blur-sm supports-backdrop-filter:bg-background/70'

  return (
    <header
      className={cn(
        `sticky top-0 flex h-14 items-center gap-4 border-b border-dotted border-border-variant bg-background`,
        `px-1.5 sm:px-3.5 lg:px-6 pr-4`,
        `${bgFilter}`,
        `${className ?? ''}`
      )}
    >
      <HeaderXSSheet />
      <SidebarToggleButton />

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
