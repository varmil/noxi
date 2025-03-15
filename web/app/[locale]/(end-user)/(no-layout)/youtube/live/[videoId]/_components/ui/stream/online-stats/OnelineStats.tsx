import { PropsWithChildren } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function OnelineStats({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center text-sm text-muted-foreground space-x-1.5 bg-muted px-4 py-2 rounded-xl">
      {children}
    </div>
  )
}

export function OnelineStatsContainer({ children }: PropsWithChildren) {
  // gridが大事
  return (
    <ScrollArea className="grid whitespace-nowrap">
      <div className="overflow-hidden">
        <div className="flex gap-2 sm:gap-4">{children}</div>
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  )
}
