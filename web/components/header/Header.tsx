import { useTranslations } from 'next-intl'
import { ModeToggle } from 'components/ModeToggle'
import HeaderNavigationMenu from 'components/header/sm/HeaderNavigationMenu'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import PeakXText from 'components/peakx/svg/text'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Header() {
  const t = useTranslations('Global')
  const bgFilter = 'backdrop-blur supports-[backdrop-filter]:bg-background/80'
  const sm = 'sm:bg-transparent sm:px-6'

  return (
    <header
      className={`sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background px-1.5 ${bgFilter} ${sm}`}
    >
      <HeaderXSSheet />

      <Link
        href="/"
        className="flex items-center gap-2.5 transition-all hover:scale-105"
      >
        <Logo className="w-6 h-6" />
        <PeakXText className="w-[49.64px] h-[17px]" />
        <h2 className="sr-only">{t('headerTitle')}</h2>
      </Link>

      <div className="hidden sm:block">
        <HeaderNavigationMenu />
      </div>

      {/* User Icon */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src="/placeholder.svg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      <div className="relative ml-auto">
        <ModeToggle />
      </div>
    </header>
  )
}
