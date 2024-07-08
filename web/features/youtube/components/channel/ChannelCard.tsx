import { PropsWithoutRef } from 'react'
import { Cake, UsersIcon } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'lib/navigation'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
  id: string
  name: string
  src: string | StaticImport
  description: string
  totalViewCount: number
  subscriberCount: number
  publishedAt: string
}

export default function ChannelCard({
  id,
  name,
  src,
  totalViewCount,
  subscriberCount,
  publishedAt
}: PropsWithoutRef<Props>) {
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
            <span>動画の総再生回数</span>
          </div>
          <span className="text-lg font-bold text-primary">
            {totalViewCount}回
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="w-4 h-4" />
          <span>{subscriberCount} Subscribers</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Cake className="w-4 h-4" />
          <span>{new Date(publishedAt).toDateString()}</span>
        </div>
      </div>
    </div>
  )
}
