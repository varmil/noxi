'use client'

import { PropsWithoutRef } from 'react'
import { Activity, LucideLayoutDashboard, MessagesSquare, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import SuperChatIcon from 'components/icons/SuperChatIcon'
import { Link, usePathname } from 'lib/navigation'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function BottomNavigation({ className }: Props) {
  const t = useTranslations('Components.bottomNavigation')
  const pathname = usePathname()

  const navigation = [
    {
      pathname: '/',
      label: t('home'),
      icon: LucideLayoutDashboard
    },
    {
      pathname: '/ranking/super-chat/channels/all/last30Days',
      isActive: pathname.startsWith('/ranking/super-chat'),
      label: t('channels'),
      icon: SuperChatIcon
    },
    {
      pathname: '/hyper-chat',
      isActive: pathname.startsWith('/hyper-chat'),
      label: t('hyperChat'),
      icon: MessagesSquare
    },
    {
      pathname: '/ranking/concurrent-viewer/live/all/realtime',
      isActive: pathname.startsWith('/ranking/concurrent-viewer'),
      label: t('live'),
      icon: Activity
    },
    {
      pathname: '/groups',
      label: t('groups'),
      icon: Search
    }
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-16.5 bg-background lg:hidden ${
        className ?? ''
      }`}
    >
      {/* workaround: https://stackoverflow.com/questions/73891040/div-with-sticky-position-relative-to-the-bottom-jumps-around-when-scrolling */}
      <div className="fixed" />
      <div className="grid h-full grid-cols-5 mx-auto">
        {navigation.map(item => {
          const isActive = (href: string) => {
            return item.isActive || pathname === href
          }
          const Icon = item.icon
          return (
            <Button
              key={item.pathname}
              variant="ghost"
              asChild
              className={cn(
                'h-full rounded-none flex flex-col items-center justify-center gap-1 p-0',
                'text-muted-foreground',
                isActive(item.pathname) &&
                  'bg-accent text-accent-foreground font-bold'
              )}
            >
              <Link href={item.pathname} prefetch={false}>
                <Icon className="size-6" />
                <span className="text-xs whitespace-nowrap">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
