'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

interface Tab {
  label: string
  href: string
}

interface SwitchTabsProps {
  tabs: Tab[]
  className?: string
}

export function SwitchTabs({ tabs, className }: SwitchTabsProps) {
  const pathname = usePathname()

  // パスの一致で現在のタブを判定（searchParams は無視）
  const currentTab = tabs.find(tab => {
    const tabPath = tab.href.split('?')[0]
    return pathname.startsWith(tabPath)
  })

  return (
    <Tabs value={currentTab?.href ?? tabs[0].href} className={className}>
      <TabsList className={cn('h-8')}>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            className={cn('h-7 px-3 text-xs')}
            asChild
          >
            <Link
              href={tab.href}
              prefetch={true}
              scroll={false}
              replace
              aria-controls={undefined}
            >
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
