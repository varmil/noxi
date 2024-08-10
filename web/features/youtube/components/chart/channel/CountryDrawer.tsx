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
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

type Props = {}

const QS_KEY = 'country'

export function CountryDrawer({ children }: React.PropsWithChildren<Props>) {
  const pathname = usePathname()
  const { has, createQueryString } = useQueryString()

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
              <DrawerSelectButton
                asChild
                active={!has(QS_KEY) || has(QS_KEY, 'US')}
              >
                <Link
                  href={{
                    pathname,
                    query: createQueryString(QS_KEY, 'US')
                  }}
                  scroll={false}
                >
                  US
                </Link>
              </DrawerSelectButton>
              <DrawerSelectButton asChild active={has(QS_KEY, 'JP')}>
                <Link
                  href={{
                    pathname,
                    query: createQueryString(QS_KEY, 'JP')
                  }}
                  scroll={false}
                >
                  Japan
                </Link>
              </DrawerSelectButton>
              <DrawerSelectButton asChild active={has(QS_KEY, 'IN')}>
                <Link
                  href={{
                    pathname,
                    query: createQueryString(QS_KEY, 'IN')
                  }}
                  scroll={false}
                >
                  India
                </Link>
              </DrawerSelectButton>
              <DrawerSelectButton asChild active={has(QS_KEY, 'GB')}>
                <Link
                  href={{
                    pathname,
                    query: createQueryString(QS_KEY, 'GB')
                  }}
                  scroll={false}
                >
                  UK
                </Link>
              </DrawerSelectButton>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
