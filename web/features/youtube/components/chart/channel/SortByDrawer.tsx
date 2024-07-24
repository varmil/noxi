'use client'

import * as React from 'react'
import useQueryString from 'hooks/useQueryString'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { DrawerSelectButton } from 'features/youtube/components/chart/channel/DrawerSelectButton'
import { Link, usePathname } from 'lib/navigation'

const QS_KEY = 'sort'

export function SortByDrawer({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const { has, createQueryString } = useQueryString()

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
              <DrawerSelectButton active={!has(QS_KEY)}>
                <Link
                  href={`${pathname}?${createQueryString(QS_KEY, null)}`}
                  scroll={false}
                >
                  Not sorted
                </Link>
              </DrawerSelectButton>
              <Separator />
              <DrawerSelectButton asChild active={has(QS_KEY, 'avarage-views')}>
                <Link
                  href={`${pathname}?${createQueryString(
                    QS_KEY,
                    'avarage-views'
                  )}`}
                  scroll={false}
                >
                  Avarage views this month
                </Link>
              </DrawerSelectButton>
              <Separator />
              <DrawerSelectButton asChild active={has(QS_KEY, 'views')}>
                <Link
                  href={`${pathname}?${createQueryString(QS_KEY, 'views')}`}
                  scroll={false}
                >
                  Views
                </Link>
              </DrawerSelectButton>
              <Separator />
              <DrawerSelectButton asChild active={has(QS_KEY, 'subscribers')}>
                <Link
                  href={`${pathname}?${createQueryString(
                    QS_KEY,
                    'subscribers'
                  )}`}
                  scroll={false}
                >
                  Subscribers
                </Link>
              </DrawerSelectButton>
              {/* <Separator /> */}
              {/* <DrawerSelectButton>Engagement rate</DrawerSelectButton> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
