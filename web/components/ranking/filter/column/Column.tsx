import { PropsWithChildren } from 'react'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Column = ({ children }: PropsWithChildren) => (
  <div className="flex-1 w-0 min-w-41 py-0">
    <ScrollArea className="h-[216px] sm:h-[240px] px-0 overflow-hidden">
      {children}
    </ScrollArea>
  </div>
)

export const ColumnHeader = ({
  children,
  showSearch
}: PropsWithChildren<{ showSearch?: boolean }>) => (
  <div className="flex items-center justify-between py-3 px-4 border-b">
    <div className="font-medium text-sm">{children}</div>
    {showSearch ? <Search className="size-4" /> : null}
  </div>
)

export const ColumnContent = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-0.5">{children}</div>
)
