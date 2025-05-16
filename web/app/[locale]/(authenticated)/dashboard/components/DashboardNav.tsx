'use client'

import {
  CreditCard,
  MessageSquare,
  Settings,
  Tickets,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

const navItems = [
  {
    title: 'プロフィール',
    href: '/dashboard',
    icon: User
  },
  {
    title: '応援チケット',
    href: '/dashboard/tickets',
    icon: Tickets
  },
  {
    title: 'コメント履歴',
    href: '/dashboard/comments',
    icon: MessageSquare,
    disabled: true
  },
  {
    title: 'サブスクリプション',
    href: '/dashboard/subscription',
    icon: CreditCard,
    disabled: true
  },
  {
    title: '通知設定',
    href: '/dashboard/settings',
    icon: Settings,
    disabled: true
  }
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2">
      {navItems.map(item => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'default' : 'ghost'}
          className={cn(
            'justify-start',
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          )}
          disabled={item.disabled}
          asChild={!item.disabled}
        >
          {item.disabled ? (
            <>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </>
          ) : (
            <Link href={item.href} prefetch={false}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          )}
        </Button>
      ))}
    </nav>
  )
}
