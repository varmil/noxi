import { useTranslations } from 'next-intl'
import { ModeToggle } from 'components/ModeToggle'
import HeaderNavigationMenu from 'components/header/sm/HeaderNavigationMenu'
import HeaderXSSheet from 'components/header/xs/HeaderXSSheet'
import LanguageSwitcher from 'components/language-switcher/components/LanguageSwitcher'
import { PageSMPX } from 'components/page'
import PeakXText from 'components/peakx/svg/text'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Header({ className }: { className?: string }) {
  const t = useTranslations('Global')
  const bgFilter = 'backdrop-blur-sm supports-backdrop-filter:bg-background/70'
  const sm = `${PageSMPX}`

  return (
    <header
      className={`sticky top-0 flex h-14 items-center gap-4 border-b border-dotted border-border-variant bg-background px-1.5 ${bgFilter} ${sm} ${
        className ?? ''
      }`}
    >
      <HeaderXSSheet />

      <Link
        href="/"
        className="flex items-center gap-2.5 transition-all hover:scale-105"
        prefetch={false}
      >
        <Logo className="w-6 h-6" />
        <PeakXText className="w-[49.64px] h-[17px]" />
        <div className="sr-only">{t('headerTitle')}</div>
      </Link>

      <div className="hidden md:block">
        <HeaderNavigationMenu />
      </div>

      <div className="flex gap-x-4 relative ml-auto">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </header>
  )
}

{
  /* User Icon */
}
{
  /* <DropdownMenu>
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
      </DropdownMenu> */
}
