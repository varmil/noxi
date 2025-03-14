import { PropsWithChildren } from 'react'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Column = ({ children }: PropsWithChildren) => (
  <div className="flex-1 pt-4 px-4 pb-0 min-w-[151px] overflow-hidden">
    {children}
  </div>
)

export const ColumnHeader = ({
  children,
  showSearch
}: PropsWithChildren<{ showSearch?: boolean }>) => (
  <div className="flex items-center justify-between mb-4 text-muted-foreground">
    <h3 className="tracking-tight font-medium">{children}</h3>
    {showSearch ? <Search className="size-4" /> : null}
  </div>
)

export const ColumnContent = ({ children }: PropsWithChildren) => (
  <ScrollArea className="h-[164px] sm:h-[184px]">
    <div className="flex flex-col gap-0.5">{children}</div>
  </ScrollArea>
)
