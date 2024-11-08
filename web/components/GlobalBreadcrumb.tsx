import React, { PropsWithoutRef } from 'react'
import { HomeIcon } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Link } from 'lib/navigation'

type Props = {
  items: Item[]
}

type Item = {
  href: string
  name: string | React.ReactNode
}

export default function GlobalBreadcrumb({
  items = []
}: PropsWithoutRef<Props>) {
  return (
    <ScrollArea className="whitespace-nowrap px-4 sm:px-6">
      <div className="w-max overflow-hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" prefetch={true}>
                  <HomeIcon className="h-5 w-5" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, i) => (
              <React.Fragment key={item.name + item.href}>
                {<BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href} prefetch={true}>
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  )
}
