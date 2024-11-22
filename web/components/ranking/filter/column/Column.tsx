import { PropsWithChildren } from 'react'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Column = ({ children }: PropsWithChildren) => (
  <div className="flex-1 p-4 pb-0 min-w-[150px]">{children}</div>
)

export const ColumnHeader = ({
  children,
  showSearch
}: PropsWithChildren<{ showSearch?: boolean }>) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-medium">{children}</h3>
    {showSearch ? <Search className="h-4 w-4 text-muted-foreground" /> : null}
  </div>
)

export const ColumnContent = ({ children }: PropsWithChildren) => (
  <ScrollArea className="h-[160px] sm:h-[175px]">
    <div className="flex flex-col gap-y-0.5 ">{children}</div>
  </ScrollArea>
)
