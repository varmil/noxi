'use client'

import React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

type Props = {
  items: {
    name: string | React.ReactNode
    href: string | string[]
    prefetch?: boolean
  }[]
  className?: string
  linkClassName?: string
}

export default function LocalNavigation({
  items,
  className,
  linkClassName
}: Props) {
  const pathname = usePathname()

  return (
    <div className={`mx-auto ${className ?? ''}`}>
      {/* gridが大事 */}
      <ScrollArea className="grid w-full whitespace-nowrap">
        <div className="flex h-auto items-center">
          {items.map(item => {
            const isActive = [item.href]
              .flat()
              .some(itemPathname => pathname === itemPathname)
            const href = Array.isArray(item.href) ? item.href[0] : item.href

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'inline-flex items-center justify-center border-b-2 px-3 py-4 font-medium transition-colors hover:text-foreground focus:outline-hidden focus:text-foreground focus:border-foreground',
                  isActive
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground',
                  linkClassName
                )}
                prefetch={item.prefetch}
                scroll={false}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
