import {
  Ellipsis,
  LogOut,
  MailIcon,
  PanelLeftIcon,
  UserRoundPlus
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
import { SignOutInSheet } from 'components/header/xs/HeaderItem'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import LanguageSwitcher from 'components/language-switcher/components/LanguageSwitcher'
import { PWAInstallButton } from 'components/pwa/PWAInstallContext'
import Image from 'components/styles/Image'
import { getGroups } from 'hooks/useGroups'
import { auth, signOut } from 'lib/auth'

export default async function HeaderXSSheet() {
  const [session, comp, groups] = await Promise.all([
    auth(),
    getTranslations('Components'),
    getGroups()
  ])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="sm:hidden">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-6 sm:max-w-xs">
        <SheetHeader hidden>
          <SheetTitle hidden>VCharts</SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        <nav className="h-full flex flex-col font-medium">
          <section className="grid gap-6 overflow-y-scroll">
            <div className="relative flex items-center ml-1 gap-4">
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {groups.imgs.slice(0, 4).map(group => (
              <HeaderLink
                key={group.id}
                name={group.name}
                icon={
                  <Image
                    src={group.src}
                    alt={group.name}
                    width={100}
                    height={100}
                    className="size-7 rounded-full"
                  />
                }
                href={`/${group.id}`}
                active
              />
            ))}

            {groups.icons.slice(0, 1).map(group => (
              <HeaderLink
                key={group.id}
                name={group.name}
                icon={<group.icon className="size-7 rounded-full" />}
                href={`/${group.id}`}
                active
              />
            ))}

            <HeaderLink
              name={comp('styles.more')}
              icon={<Ellipsis className="size-7" />}
              href="/groups"
              active
            />

            <Separator orientation="horizontal" />

            <HeaderLink
              name={comp('contact.title')}
              icon={<MailIcon className="size-7" />}
              href="/contact"
            />

            <HeaderLink
              name={comp('channelsAdd.title')}
              icon={<UserRoundPlus className="size-7" />}
              href="/channels/add"
            />

            <HeaderLink
              name="Terms of Use and PP"
              icon={<PrivacyPolicyIcon className="size-6.5" />}
              href="/terms-of-use-and-privacy-policy"
            />

            {session ? (
              <SignOutInSheet
                name={comp('auth.signOut')}
                icon={<LogOut className="size-7" />}
              />
            ) : null}

            <Separator orientation="horizontal" />

            <PWAInstallButton />
          </section>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
