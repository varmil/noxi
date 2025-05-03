import { Ellipsis, MailIcon, PanelLeftIcon, UserRoundPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
import HeaderLink from 'components/header/HeaderLink'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import { PWAInstallButton } from 'components/pwa/PWAInstallContext'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'
import { Link } from 'lib/navigation'
import Logo from '../../Logo'

export default function HeaderXSSheet() {
  const comp = useTranslations('Components')
  const groups = useGroups()

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
          <SheetTitle hidden>PeakX</SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        <nav className="h-full flex flex-col font-medium">
          <section className="grid gap-6 overflow-y-scroll">
            <Link href="/" className="h-10 w-10">
              <Logo className="size-7" />
              <span className="sr-only">PeakX</span>
            </Link>

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
              active
            />

            <HeaderLink
              name={comp('channelsAdd.title')}
              icon={<UserRoundPlus className="size-7" />}
              href="/channels/add"
              active
            />

            <HeaderLink
              name="Terms of Use and PP"
              icon={<PrivacyPolicyIcon className="size-6.5" />}
              href="/youtube/terms-of-use-and-privacy-policy"
            />

            <Separator orientation="horizontal" />

            <PWAInstallButton />
          </section>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
