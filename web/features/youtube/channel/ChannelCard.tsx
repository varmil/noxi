import { DollarSignIcon, UsersIcon } from 'lucide-react'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithoutRef } from 'react'

type Props = {
  name: string
  src: string | StaticImport
}

export default function ChannelCard({ name, src }: PropsWithoutRef<Props>) {
  return (
    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg border shadow-md group hover:shadow-lg hover:-translate-y-2 flex items-center">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Channel</span>
      </Link>
      <Image
        src={src}
        alt={`チャンネル: ${name}`}
        width={300}
        height={200}
        className="object-cover w-[30%] h-full rounded-l-lg"
        priority={false}
      />
      <div className="px-4 py-2 bg-background flex-1 w-[70%]">
        <h3 className="line-clamp-1 mb-2">{name}</h3>

        <div className="ra-val mb-0 sm:mb-2">
          <div className="text-xs sm:text-sm text-muted-foreground line leading-3">
            年収・収入
          </div>
          <span className="text-lg font-bold text-primary">
            18億5810万5012円
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSignIcon className="w-4 h-4" />
          <span>$1.2M</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="w-4 h-4" />
          <span>3.4M Subscribers</span>
        </div>
      </div>
    </div>
  )
}
