import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  Settings2Icon,
  TabletSmartphoneIcon
} from 'lucide-react'
import React, { PropsWithoutRef } from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
}

export default function IconBlock({
  title,
  description,
  icon
}: PropsWithoutRef<Props>) {
  return (
    <div className="grid grid-cols-subgrid">
      <a
        className="group flex flex-col justify-center hover:bg-primary-foreground/90 rounded-lg p-4 md:p-7"
        href="#"
      >
        <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
          {icon}
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        <span className="mt-2 flex flex-grow items-end gap-x-1.5 text-sm  decoration-2 group-hover:underline font-medium">
          Learn more
          <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
        </span>
      </a>
    </div>
  )
}
