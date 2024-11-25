'use client'

import { PropsWithoutRef } from 'react'
import { Home, Radio, Settings, User, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function BottomNavigation({ className }: Props) {
  const pathname = usePathname()

  const navigation = [
    {
      href: '/',
      label: 'ホーム',
      icon: Home
    },
    {
      href: '/youtube/ranking/live',
      query: '?period=realtime&dimension=concurrent-viewer',
      label: 'ライブ',
      icon: Radio
    },
    {
      href: '/groups',
      label: 'タレント',
      icon: Users
    }
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-14 bg-background border-t md:hidden ${
        className ?? ''
      }`}
    >
      <div className="grid h-full grid-cols-3 mx-auto">
        {navigation.map(item => {
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                'h-full rounded-none flex flex-col items-center justify-center gap-1 p-0',
                pathname === item.href &&
                  'bg-muted text-primary hover:bg-muted hover:text-primary'
              )}
            >
              <Link href={item.href + (item.query || '')} prefetch={true}>
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
