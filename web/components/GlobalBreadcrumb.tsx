import React, { PropsWithoutRef } from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from 'lib/navigation'

type Props = {
  items: Item[]
}

type Item = {
  href: string
  name: string
}

export default function GlobalBreadcrumb({
  items = []
}: PropsWithoutRef<Props>) {
  return (
    <div className="hidden md:flex sm:px-6">
      <Breadcrumb className="">
        <BreadcrumbList>
          {items.map((item, i) => (
            <React.Fragment key={item.name + item.href}>
              {i !== 0 && <BreadcrumbSeparator />}
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
  )
}
