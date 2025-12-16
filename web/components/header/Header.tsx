import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import HeaderAuth from 'components/header/HeaderAuth'
import HeaderNavigationMenu from 'components/header/sm/HeaderNavigationMenu'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import { PageSMPX } from 'components/page'
import VChartsText from 'components/vcharts/svg/text'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default async function Header({ className }: { className?: string }) {
  const [global, groups] = await Promise.all([
    getTranslations('Global'),
    getGroups()
  ])

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

      <div className="hidden md:block">
        <HeaderNavigationMenu groups={groups} />
      </div>

      <Suspense fallback={<div className="sr-only">Loading...</div>}>
        <HeaderAuth />
      </Suspense>
    </header>
  )
}
