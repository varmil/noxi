import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { CategoryDrawer } from 'components/filter-and-sort/CategoryDrawer'
import { CountryDrawer } from 'components/filter-and-sort/CountryDrawer'
import { SortByDrawer } from 'components/filter-and-sort/SortByDrawer'

const ButtonWithIcon = ({ text }: React.PropsWithoutRef<{ text: string }>) => (
  <Button variant="outline" className="bg-transparent">
    {text}
    <ChevronDown className="ml-2 h-4 w-4" />
  </Button>
)

const DrawerSkeleton = () => (
  <>
    <Skeleton className="h-10 w-28 rounded-sm" />
    <Skeleton className="h-10 w-28 rounded-sm" />
    <Skeleton className="h-10 w-28 rounded-sm" />
  </>
)

/** @deprecated 2026/01/17 未使用状態 */
export async function FilterAndSort() {
  return (
    <ScrollArea className="whitespace-nowrap">
      <div className="flex w-max items-center gap-2">
        <React.Suspense fallback={<DrawerSkeleton />}>
          <SortByDrawer>
            <ButtonWithIcon text="Sort" />
          </SortByDrawer>
          <CategoryDrawer>
            <ButtonWithIcon text="Category" />
          </CategoryDrawer>
          {/* <ButtonWithIcon text="Date" /> */}
          <CountryDrawer>
            <ButtonWithIcon text="Country" />
          </CountryDrawer>
        </React.Suspense>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
