import { Suspense } from 'react'
import { Ellipsis, MailIcon, UserRoundPlus } from 'lucide-react'
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
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import AsideSkeleton from 'components/skeleton/AsideSkeleton'
import useGroups from 'hooks/useGroups'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Aside({ className }: { className?: string }) {
  const global = useTranslations('Global')
  const comp = useTranslations('Components')
  const groups = useGroups()

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

                {groups.icons.map(group => (
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
                {/* <Tooltip>
                      <TooltipTrigger>
                        <Link
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                          prefetch={false}
                        >
                          <SettingsIcon className="size-6" />
                          <span className="sr-only">Settings</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip> 
                */}

                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/contact"
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
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
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
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
                      href="/youtube/terms-of-use-and-privacy-policy"
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
            </nav>
          </section>
        </ScrollArea>
      </Suspense>
    </aside>
  )
}
