import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import AsideIcon from 'components/aside/AsideIcon'
import AsideStreamIcons from 'components/aside/AsideStreamIcons'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import useGroups from 'hooks/useGroups'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Aside({ className }: { className?: string }) {
  const t = useTranslations('Global')
  const groups = useGroups()

  return (
    <aside
      className={`fixed inset-y-0 left-0 hidden sm:flex w-14 flex-col border-r bg-background ${
        className ?? ''
      }`}
    >
      <ScrollArea className="h-screen">
        <section className="flex flex-col gap-3 px-2 py-3">
          <nav className="flex flex-col items-center gap-3">
            <TooltipProvider delayDuration={0}>
              <Link
                href="/"
                className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary mb-2.5"
                prefetch={true}
              >
                <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">{t('title')}</span>
              </Link>

              <AsideStreamIcons />

              <Separator orientation="horizontal" />

              {groups.imgs.map(group => (
                <AsideIcon
                  key={group.id}
                  name={group.name}
                  href={`/${group.id}`}
                  src={group.src}
                  roundedFull
                />
              ))}

              {groups.icons.map(group => (
                <AsideIcon
                  key={group.id}
                  name={group.name}
                  href={`/${group.id}`}
                  icon={<group.icon className="h-6 w-6" />}
                  roundedFull
                />
              ))}
            </TooltipProvider>
          </nav>

          <Separator orientation="horizontal" />

          <nav className="flex flex-col items-center gap-3">
            <TooltipProvider delayDuration={0}>
              {/* <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <SettingsIcon className="h-6 w-6" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/youtube/terms-of-use-and-privacy-policy"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                    prefetch={false}
                  >
                    <PrivacyPolicyIcon className="h-5 w-5" />
                    <span className="sr-only">
                      Terms of Use and Privacy Policy
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Terms of Use and Privacy Policy
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </section>
      </ScrollArea>
    </aside>
  )
}
