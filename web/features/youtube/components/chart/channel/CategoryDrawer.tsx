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

export function CategoryDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Category</DrawerTitle>
            <DrawerDescription>
              Filter by the YouTube categories.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 px-6 pb-4">
            <div className="flex flex-col items-center border rounded-md">
              <DrawerSelectButton active>Travel & Events</DrawerSelectButton>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
