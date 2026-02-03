'use client'

import React, { useRef, useState, useEffect } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const viewport = container?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    )
    if (!viewport) return

    const updateFades = () => {
      const { scrollLeft, scrollWidth, clientWidth } = viewport
      setShowLeftFade(scrollLeft > 0)
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 1)
    }

    updateFades()
    viewport.addEventListener('scroll', updateFades)
    window.addEventListener('resize', updateFades)

    return () => {
      viewport.removeEventListener('scroll', updateFades)
      window.removeEventListener('resize', updateFades)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('text-sm mx-auto relative', className)}
    >
      {/* 左フェード - スクロール可能を示す */}
      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-background to-transparent transition-opacity',
          showLeftFade ? 'opacity-100' : 'opacity-0'
        )}
      />
      {/* 右フェード - スクロール可能を示す */}
      <div
        className={cn(
          'pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-background to-transparent transition-opacity',
          showRightFade ? 'opacity-100' : 'opacity-0'
        )}
      />

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
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
