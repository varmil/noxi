import { Suspense } from 'react'
import {
  Ellipsis,
  FileChartLine,
  MailIcon,
  UserRoundPlus,
  UsersRound
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import AsideIcon from 'components/aside/AsideIcon'
import { SettingsDropdown } from 'components/aside/SettingsDropdown'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import XIcon from 'components/icons/XIcon'
import AsideSkeleton from 'components/skeleton/AsideSkeleton'
import { getGroups } from 'hooks/useGroups'
import { auth } from 'lib/auth'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default async function Aside({ className }: { className?: string }) {
  const [session, global, comp, groups] = await Promise.all([
    auth(),
    getTranslations('Global'),
    getTranslations('Components'),
    getGroups()
  ])

  return (
    <aside
      className={`fixed inset-y-0 left-0 hidden sm:flex w-14 flex-col border-r bg-background ${
        className ?? ''
      }`}
    >
      <Suspense fallback={<AsideSkeleton />}>
        <ScrollArea className="h-screen">
          <section className="flex flex-col gap-3 px-2 py-3">
            <nav className="flex flex-col items-center gap-3">
              <TooltipProvider delayDuration={0}>
                <Link
                  href="/"
                  className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-muted mb-2.5"
                  prefetch={false}
                >
                  <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">{global('title')}</span>
                </Link>

                {/* @deprecated 多分使わない（パフォーマンス） */}
                {/* <AsideStreamIcons />
                <AsideIcon
                  name={comp('styles.more')}
                  href={StreamRankingDefaultUrl}
                  icon={<Ellipsis className="size-6" />}
                  roundedFull
                /> */}

                {/* <Separator orientation="horizontal" /> */}

                {groups.imgs.slice(0, 4).map(group => (
                  <AsideIcon
                    key={group.id}
                    name={group.name}
                    href={`/${group.id}`}
                    src={group.src}
                    roundedFull
                  />
                ))}

                {groups.icons.slice(0, 1).map(group => (
                  <AsideIcon
                    key={group.id}
                    name={group.name}
                    href={`/${group.id}`}
                    icon={<group.icon className="size-6" />}
                    roundedFull
                  />
                ))}

                <AsideIcon
                  name={comp('styles.more')}
                  href={'/groups'}
                  icon={<Ellipsis className="size-6" />}
                  roundedFull
                />
              </TooltipProvider>
            </nav>

            <Separator orientation="horizontal" />

            <nav className="flex flex-col items-center gap-3">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/contact"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      prefetch={false}
                    >
                      <MailIcon className="size-6" />
                      <span className="sr-only">{comp('contact.title')}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {comp('contact.title')}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/channels/add"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      prefetch={false}
                    >
                      <UserRoundPlus className="size-6" />
                      <span className="sr-only">
                        {comp('channelsAdd.title')}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {comp('channelsAdd.title')}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/groups/add"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      prefetch={false}
                    >
                      <UsersRound className="size-6" />
                      <span className="sr-only">{comp('groupsAdd.title')}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {comp('groupsAdd.title')}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://x.com/VCharts_net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <XIcon className="size-5" />
                      <span className="sr-only">{comp('aside.xAccount')}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {comp('aside.xAccount')}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/data-methodology-and-disclaimer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      prefetch={false}
                    >
                      <FileChartLine className="size-5.5" />
                      <span className="sr-only">
                        Data Methodology & Disclaimer
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Data Methodology & Disclaimer
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/terms-of-use-and-privacy-policy"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      prefetch={false}
                    >
                      <PrivacyPolicyIcon className="size-5.5" />
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

              <SettingsDropdown session={session} />
            </nav>
          </section>
        </ScrollArea>
      </Suspense>
    </aside>
  )
}
