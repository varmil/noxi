'use client'

import { PropsWithoutRef } from 'react'
import { CircleDollarSign, Home, Radio, Users } from 'lucide-react'
import { useParams } from 'next/navigation'
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
  const params = useParams()

  const navigation = [
    {
      pathname: '/',
      label: t('home'),
      icon: Home
    },
    {
      pathname: '/youtube/live/ranking',
      query: '?dimension=concurrent-viewer&period=realtime',
      label: t('live'),
      icon: Radio
    },
    {
      pathname: '/youtube/channels/ranking',
      query: '?dimension=super-chat&period=last24Hours',
      label: t('channels'),
      icon: CircleDollarSign
    },
    {
      pathname: '/groups',
      label: t('groups'),
      icon: Users,
      isActive: !!params['group']
    }
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-14 bg-background md:hidden ${
        className ?? ''
      }`}
    >
      <div className="grid h-full grid-cols-4 mx-auto">
        {navigation.map(item => {
          const Icon = item.icon
          return (
            <Button
              key={item.pathname}
              variant="ghost"
              asChild
              // OR 判定でアクティブかどうか
              className={cn(
                'h-full rounded-none flex flex-col items-center justify-center gap-1 p-0',
                'font-normal text-muted-foreground',
                (item.isActive || isActive(item.pathname)) &&
                  'bg-accent text-accent-foreground font-bold hover:bg-muted hover:text-primary'
              )}
            >
              <Link href={item.pathname + (item.query || '')} prefetch={true}>
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
