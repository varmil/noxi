'use client'

import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, usePathname } from 'lib/navigation'

interface Tab {
  label: string
  href: string
}

interface LinkTabsProps {
  className?: string
  tabs: Tab[]
}

export function LinkTabs({ tabs, className }: LinkTabsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentUrl = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`

  return (
    <Tabs value={currentUrl} className={`w-full ${className ?? ''}`}>
      <TabsList className="w-full">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            className="flex-1"
            asChild
          >
            <Link href={tab.href} prefetch={true} scroll={false} replace>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
