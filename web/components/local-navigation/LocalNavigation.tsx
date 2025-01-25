'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Link, usePathname } from 'lib/navigation'

type Props = {
  items: { name: string; href: string; prefetch?: boolean }[]
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
        <div className="flex h-14 items-center">
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex items-center justify-center border-b-2 px-3 py-4 text-sm font-medium transition-colors hover:text-foreground focus:outline-hidden focus:text-foreground focus:border-foreground',
                pathname === item.href
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground',
                linkClassName
              )}
              prefetch={item.prefetch}
              scroll={false}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible sm:visible" />
      </ScrollArea>
    </div>
  )
}
