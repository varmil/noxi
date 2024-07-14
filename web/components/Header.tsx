import { PropsWithChildren } from 'react'
import { SearchIcon, SettingsIcon } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { ModeToggle } from 'components/ModeToggle'
import InstagramIcon from 'components/icons/InstagramIcon'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import TikTokIcon from 'components/icons/TikTokIcon'
import TwitchIcon from 'components/icons/TwitchIcon'
import { Link } from 'lib/navigation'
import Logo from './Logo'

const IconWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex justify-center items-center h-8 w-8">{children}</div>
)

export default function Header() {
  const t = useTranslations('Global')

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeftIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:text-base"
              prefetch={false}
            >
              <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">PeakX</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-foreground"
              prefetch={false}
            >
              <Image
                src={'/yt_icon_rgb.png'}
                alt={`YouTube icon`}
                width={734 / 4}
                height={518 / 4}
                className="h-8 w-8 object-contain transition-all group-hover:scale-110"
                priority={false}
              />
              <span className="flex-1">YouTube</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <IconWrapper>
                <TwitchIcon className="h-6 w-6" />
              </IconWrapper>
              <span className="flex-1">Coming soon...</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground"
              prefetch={false}
            >
              <IconWrapper>
                <TikTokIcon className="h-6 w-6" />
              </IconWrapper>
              <span className="flex-1">Coming soon...</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <IconWrapper>
                <InstagramIcon className="h-6 w-6" />
              </IconWrapper>
              <span className="flex-1">Coming soon...</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <IconWrapper>
                <SettingsIcon className="h-6 w-6" />
              </IconWrapper>
              <span className="flex-1">Settings</span>
            </Link>
            <Link
              href="/youtube/terms-of-use-and-privacy-policy"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <IconWrapper>
                <PrivacyPolicyIcon className="h-6 w-6" />
              </IconWrapper>
              <span className="flex-1">Terms of Use and Privacy Policy</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <Link
        href="/"
        className="flex items-center gap-2"
        prefetch={false}
        scroll={false}
      >
        <Logo className="w-6 h-6" />
        <span className="md:flex text-lg font-bold">{t('headerTitle')}</span>
      </Link>

      {/* Search Icon */}
      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div> */}

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

      <div className="relative ml-auto ">
        <ModeToggle />
      </div>
    </header>
  )
}

function PanelLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  )
}
