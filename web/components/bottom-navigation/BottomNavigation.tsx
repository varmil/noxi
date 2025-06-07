'use client'

import { PropsWithoutRef } from 'react'
import { Activity, MessageCircleQuestion, Search, Trophy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function BottomNavigation({ className }: Props) {
  const t = useTranslations('Components.bottomNavigation')
  const pathname = usePathname()

  const navigation = [
    {
      pathname: '/ranking/most-cheered/all/last30Days',
      isActive: pathname.startsWith('/ranking/most-cheered'),
      label: t('mostCheered'),
      icon: Trophy
    },
    {
      pathname: '/ranking/top-fans/all/last30Days',
      isActive: pathname.startsWith('/ranking/top-fans'),
      label: t('topFans'),
      icon: Activity
    },
    {
      pathname: '/groups',
      label: t('groups'),
      icon: Search
    },
    {
      pathname: '/how-to-play',
      label: t('howToPlay'),
      icon: MessageCircleQuestion
    }
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-14.5 bg-background lg:hidden ${
        className ?? ''
      }`}
    >
      {/* workaround: https://stackoverflow.com/questions/73891040/div-with-sticky-position-relative-to-the-bottom-jumps-around-when-scrolling */}
      <div className="fixed" />
      <div className="grid h-full grid-cols-4 mx-auto">
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
                <Icon className={`size-5`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
