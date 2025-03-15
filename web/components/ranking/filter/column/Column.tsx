import { PropsWithChildren } from 'react'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Column = ({ children }: PropsWithChildren) => (
  <div className="flex-1 pt-4 pb-0 min-w-[144px]">
    <ScrollArea className="h-[192px] sm:h-[212px] px-4 overflow-hidden">
      {children}
    </ScrollArea>
  </div>
)

export const ColumnHeader = ({
  children,
  showSearch
}: PropsWithChildren<{ showSearch?: boolean }>) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm">{children}</h3>
    {showSearch ? <Search className="size-4" /> : null}
  </div>
)

export const ColumnContent = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-0.5">{children}</div>
)
