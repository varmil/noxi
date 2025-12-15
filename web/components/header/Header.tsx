import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import AuthModalWithButton from 'components/auth/dialog/AuthModalWithButton'
import UserDropdown from 'components/header/UserDropdown'
import HeaderNavigationMenu from 'components/header/sm/HeaderNavigationMenu'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import { PageSMPX } from 'components/page'
import VChartsText from 'components/vcharts/svg/text'
import { auth } from 'lib/auth'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default async function Header({ className }: { className?: string }) {
  const [session, global, groups] = await Promise.all([
    auth(),
    getTranslations('Global'),
    await getGroups()
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

      <div className="relative ml-auto">
        {session ? <UserDropdown session={session} /> : <AuthModalWithButton />}
      </div>
    </header>
  )
}
