import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import { ModeToggle } from 'components/ModeToggle'
import HeaderLink from 'components/header/HeaderLink'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

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
          <SheetHeader hidden>
            <SheetTitle hidden>PeakX</SheetTitle>
            <SheetDescription hidden></SheetDescription>
          </SheetHeader>
          <nav className="h-full flex flex-col text-lg font-medium">
            <section className="grid gap-6">
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">PeakX</span>
              </Link>

              <HeaderLink
                name={t('group.hololive')}
                icon={
                  <Image
                    src={'/hololiveicon.png'}
                    alt={t('group.hololive')}
                    width={100}
                    height={100}
                    className="h-8 w-8"
                  />
                }
                href="/hololive"
                active
              />
              <HeaderLink
                name={t('group.hololive-english')}
                icon={
                  <Image
                    src={'/hololive/hololive_en_square.png'}
                    alt={t('group.hololive-english')}
                    width={100}
                    height={100}
                    className="h-8 w-8"
                  />
                }
                href="/hololive-english"
                active
              />
              <HeaderLink
                name={t('group.hololive-indonesia')}
                icon={
                  <Image
                    src={'/hololive/hololive_id_square.png'}
                    alt={t('group.hololive-indonesia')}
                    width={100}
                    height={100}
                    className="h-8 w-8"
                  />
                }
                href="/hololive-indonesia"
                active
              />

              {/* <HeaderLink
              name="YouTube"
              icon={
                <Image
                  src={'/yt_icon_rgb.png'}
                  alt={`YouTube icon`}
                  width={734 / 4}
                  height={518 / 4}
                  className="h-8 w-8 object-contain transition-all group-hover:scale-110"
                />
              }
              href="#"
              active
            /> */}
              {/* <HeaderLink
              name="Twitch"
              icon={<TwitchIcon className="h-6 w-6" />}
              href="#"
            />
            <HeaderLink
              name="TikTok"
              icon={<TikTokIcon className="h-6 w-6" />}
              href="#"
            />
            <HeaderLink
              name="Instagram"
              icon={<InstagramIcon className="h-6 w-6" />}
              href="#"
            />
            <HeaderLink
              name="Settings"
              icon={<SettingsIcon className="h-6 w-6" />}
              href="#"
            /> */}
            </section>

            <div className="mt-auto">
              <HeaderLink
                name="Terms of Use and Privacy Policy"
                icon={<PrivacyPolicyIcon className="h-6 w-6" />}
                href="/youtube/terms-of-use-and-privacy-policy"
              />
            </div>
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
