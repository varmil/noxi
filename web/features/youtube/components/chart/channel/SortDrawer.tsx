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

const SelectButton = ({
  active,
  children
}: React.PropsWithChildren<{ active?: boolean }>) => {
  const bg = active ? ' bg-accent ' : ''
  return (
    <Button variant="ghost" className={`justify-start w-full ${bg}`}>
      {children}
    </Button>
  )
}

export function SortDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Sort by...</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 px-6 pb-4">
            <div className="flex flex-col items-center border rounded-md">
              <SelectButton active>Default</SelectButton>
              <Separator />
              <SelectButton>Ghost</SelectButton>
              <Separator />
              <SelectButton>Ghost</SelectButton>
              <Separator />
              <SelectButton>Ghost</SelectButton>
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
