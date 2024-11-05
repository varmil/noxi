import { PanelLeftIcon, Webcam } from 'lucide-react'
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
import HeaderLink from 'components/header/HeaderLink'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'
import Logo from '../../Logo'

export default function HeaderXSSheet() {
  const t = useTranslations('Global')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="sm:hidden">
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
              prefetch={true}
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
                  className="h-8 w-8 rounded-full"
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
                  className="h-8 w-8 rounded-full"
                />
              }
              href="/hololive-indonesia"
              active
            />
            <HeaderLink
              name={t('group.vspo')}
              icon={
                <Image
                  src={'/vspo/logo.png'}
                  alt={t('group.vspo')}
                  width={100}
                  height={100}
                  className="h-8 w-8 rounded-full"
                />
              }
              href="/vspo"
              active
            />
            <HeaderLink
              name={t('group.independent')}
              icon={
                <Image
                  src={'/vtuber/independent/pixai-001.png'}
                  alt={t('group.independent')}
                  width={100}
                  height={100}
                  className="h-8 w-8 rounded-full"
                />
              }
              href="/independent"
              active
            />
            <HeaderLink
              name={t('group.independent-irl')}
              icon={<Webcam className="h-8 w-8 rounded-full" />}
              href="/independent-irl"
              active
            />

            {/* 
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
  )
}
