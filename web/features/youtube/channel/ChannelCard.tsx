import { Link } from 'lib/navigation'
import { Cake, UsersIcon } from 'lucide-react'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { PropsWithoutRef } from 'react'

// TODO:
const id = 'abcd1234'

type Props = {
  name: string
  src: string | StaticImport
}

export default function ChannelCard({ name, src }: PropsWithoutRef<Props>) {
  return (
    <div className="relative overflow-hidden transition-transform duration-75 ease-in-out rounded-lg border shadow-md group hover:shadow-lg hover:-translate-y-2 flex items-center max-h-48">
      <Link
        href={`/youtube/channels/${id}`}
        className="absolute inset-0 z-10"
        prefetch={false}
      >
        <span className="sr-only">View Channel</span>
      </Link>
      <Image
        src={src}
        alt={`チャンネル: ${name}`}
        width={300}
        height={200}
        className="object-cover w-[33%] h-full rounded-l-lg"
        priority={false}
      />
      <div className="px-4 py-2 bg-background flex-1 w-[70%]">
        <h3 className="line-clamp-1 mb-2">{name}</h3>

        <div className="ra-val mb-0 sm:mb-2">
          <div className="text-xs sm:text-sm text-muted-foreground line leading-3">
            <span>最新動画の再生回数</span>
          </div>
          <span className="text-lg font-bold text-primary">123万4567回</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Cake className="w-4 h-4" />
          <span>2019/07/01</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="w-4 h-4" />
          <span>3.45M Subscribers</span>
        </div>
      </div>
    </div>
  )
}
