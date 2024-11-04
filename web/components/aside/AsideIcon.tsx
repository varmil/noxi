import React, { PropsWithoutRef } from 'react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = {
  name: string
  href: string

  /** @required when use Image */
  src?: string
  /** @required when use Icon */
  icon?: JSX.Element

  /** Tooltip content */
  content?: React.ReactNode

  roundedFull?: boolean
}

export default function AsideIcon({
  name,
  href,
  src,
  icon,
  content,
  roundedFull
}: PropsWithoutRef<Props>) {
  if (!src && !icon) return null
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={href}
          className="group flex h-7 w-7 items-center justify-center rounded-lg"
          prefetch={false}
        >
          {src && (
            <Image
              src={src}
              alt={`${name} icon`}
              width={100}
              height={100}
              className={`transition-all group-hover:scale-110  ${
                roundedFull && 'rounded-full'
              }`}
            />
          )}

          {icon}

          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{content || name}</TooltipContent>
    </Tooltip>
  )
}
