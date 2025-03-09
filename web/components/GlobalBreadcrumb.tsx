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
import { PageSMPX, PageXSPX } from 'components/page'
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
    <ScrollArea className={`whitespace-nowrap ${PageXSPX} ${PageSMPX}`}>
      <div className="w-max overflow-hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" aria-label="Home" prefetch={false}>
                  <HomeIcon className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, i) => (
              <React.Fragment key={item.name + item.href}>
                {<BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href} prefetch={false}>
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
