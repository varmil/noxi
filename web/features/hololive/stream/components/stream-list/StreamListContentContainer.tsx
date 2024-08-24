import { PropsWithoutRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const StreamListContentContainer = ({
  children,
  compact
}: PropsWithoutRef<{
  children: React.ReactNode
  compact?: boolean
}>) => {
  if (compact)
    return (
      <ScrollArea className="h-[600px] sm:h-[750px] pr-4">
        {children}
      </ScrollArea>
    )

  return <section>{children}</section>
}

export default StreamListContentContainer
