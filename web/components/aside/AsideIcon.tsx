import { PropsWithoutRef } from 'react'
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
  src: string
  roundedFull?: boolean
}

export default function AsideIcon({
  name,
  href,
  src,
  roundedFull
}: PropsWithoutRef<Props>) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={href}
          className="group flex h-8 w-8 items-center justify-center rounded-lg"
          prefetch={false}
        >
          <Image
            src={src}
            alt={`${name} icon`}
            width={100}
            height={100}
            className={`transition-all group-hover:scale-110  ${
              roundedFull && 'rounded-full'
            }`}
          />

          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{name}</TooltipContent>
    </Tooltip>
  )
}
