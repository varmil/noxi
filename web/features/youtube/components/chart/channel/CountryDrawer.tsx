'use client'

import * as React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { DrawerSelectButton } from 'features/youtube/components/chart/channel/DrawerSelectButton'

export function CountryDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Country</DrawerTitle>
            <DrawerDescription>
              Filter by the country to which the YouTube channel is associated.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 px-6 pb-4">
            <div className="flex flex-col [&>*:not(:last-child)]:border-b items-center border rounded-md">
              <DrawerSelectButton active>All Regions</DrawerSelectButton>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
