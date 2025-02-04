'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, usePathname } from 'lib/navigation'

interface Tab {
  label: string
  href: string
}

interface LinkTabsProps {
  tabs: Tab[]
}

export function LinkTabs({ tabs }: LinkTabsProps) {
  const pathname = usePathname()

  return (
    <Tabs value={pathname} className="w-full">
      <TabsList className="w-full mb-4">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            className="flex-1"
            asChild
          >
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
