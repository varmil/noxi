'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { DrawerSelectButton } from 'features/youtube/components/chart/channel/DrawerSelectButton'

export function SortByDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Sort</DrawerTitle>
            <DrawerDescription>
              Sort by avarage views, total views, subscribers, etc.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 px-6 pb-4">
            <div className="flex flex-col items-center border rounded-md">
              <DrawerSelectButton active>Not sorted</DrawerSelectButton>
              <Separator />
              <DrawerSelectButton>Avarage views this month</DrawerSelectButton>
              <Separator />
              <DrawerSelectButton>Views</DrawerSelectButton>
              <Separator />
              <DrawerSelectButton>Subscribers</DrawerSelectButton>
              {/* <Separator /> */}
              {/* <DrawerSelectButton>Engagement rate</DrawerSelectButton> */}
            </div>
          </div>
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
