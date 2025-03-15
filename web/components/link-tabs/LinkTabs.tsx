'use client'

import { useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
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
  size?: 'sm'
}

export function LinkTabs({
  tabs,
  className,
  ignoreSearchParams,
  size
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
      <TabsList className={cn('w-full', size === 'sm' && 'h-9')}>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            className={cn('flex-1', size === 'sm' && 'text-sm py-1')}
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
