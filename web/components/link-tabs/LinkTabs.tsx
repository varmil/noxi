'use client'

import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, usePathname } from 'lib/navigation'

interface Tab {
  label: string
  href: string
}

interface LinkTabsProps {
  tabs: Tab[]
  className?: string
  /** Active判定の際にsearchParamsをみない */
  ignoreSearchParams?: boolean
}

export function LinkTabs({
  tabs,
  className,
  ignoreSearchParams
}: LinkTabsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentUrl = ignoreSearchParams
    ? pathname
    : `${pathname}${
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
