import { Link } from 'lib/navigation'
import { ChevronRightIcon } from 'lucide-react'
import React, { PropsWithoutRef } from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export default function IconBlock({
  icon,
  title,
  description,
  href
}: PropsWithoutRef<Props>) {
  return (
    <div className="grid grid-cols-subgrid">
      <Link
        className="group flex flex-col justify-center hover:bg-primary-foreground/90 rounded-lg p-4 md:p-7"
        href={href}
      >
        <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
          {icon}
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        <span className="mt-2 flex flex-grow items-end gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
          Search channels
          <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
        </span>
      </Link>
    </div>
  )
}
