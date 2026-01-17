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
import { DrawerSelectButton } from 'components/filter-and-sort/DrawerSelectButton'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

const QS_KEY = 'sort'

/** @deprecated 2026/01/17 未使用状態 */
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
            <div className="flex flex-col [&>*:not(:last-child)]:border-b items-center border rounded-md">
              {/**
               * Default is sorted by subscribers
               */}
              <DrawerSelectButton
                asChild
                active={!has(QS_KEY) || has(QS_KEY, 'subscribers')}
              >
                <Link
                  href={`${pathname}${createQueryString(
                    QS_KEY,
                    'subscribers'
                  )}`}
                  prefetch={true}
                >
                  Subscribers
                </Link>
              </DrawerSelectButton>
              <DrawerSelectButton asChild active={has(QS_KEY, 'views')}>
                <Link
                  href={`${pathname}${createQueryString(QS_KEY, 'views')}`}
                  prefetch={true}
                >
                  Views
                </Link>
              </DrawerSelectButton>

              {/* <DrawerSelectButton>Engagement rate</DrawerSelectButton> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
