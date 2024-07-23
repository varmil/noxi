import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CategoryDrawer } from 'features/youtube/components/chart/channel/CategoryDrawer'
import { CountryDrawer } from 'features/youtube/components/chart/channel/CountryDrawer'
import { SortByDrawer } from 'features/youtube/components/chart/channel/SortByDrawer'

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
        <SortByDrawer>
          <ButtonWithIcon text="Travel vlog english" />
        </SortByDrawer>
        <CategoryDrawer>
          <ButtonWithIcon text="Category" />
        </CategoryDrawer>
        {/* <ButtonWithIcon text="Date" /> */}
        <CountryDrawer>
          <ButtonWithIcon text="Country" />
        </CountryDrawer>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
