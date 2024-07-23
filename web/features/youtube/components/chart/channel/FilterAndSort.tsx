import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SortDrawer } from 'features/youtube/components/chart/channel/SortDrawer'

const ButtonWithIcon = ({ text }: React.PropsWithoutRef<{ text: string }>) => (
  <Button variant="outline" className="bg-transparent">
    {text}
    <ChevronDown className="ml-2 h-4 w-4" />
  </Button>
)

export async function FilterAndSort() {
  return (
    <ScrollArea className=" whitespace-nowrap">
      <div className="flex w-max items-center gap-2">
        <SortDrawer>
          <ButtonWithIcon text="Travel vlog english" />
        </SortDrawer>
        <ButtonWithIcon text="Category" />
        <ButtonWithIcon text="Date" />
        <ButtonWithIcon text="Country" />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
