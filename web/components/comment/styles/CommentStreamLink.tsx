import { PropsWithoutRef } from 'react'
import { LinkIcon } from 'lucide-react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

export function CommentStreamLink({
  stream
}: PropsWithoutRef<{ stream: StreamSchema }>) {
  const { videoId, snippet } = stream
  return (
    <div className="flex items-center justify-end w-full gap-x-1">
      <LinkIcon className="size-3 text-muted-foreground" />
      <div className="flex-1 text-xs text-muted-foreground line-clamp-1 break-anywhere">
        <Link className="hover:underline" href={`/youtube/live/${videoId}`}>
          {snippet.title}
        </Link>
      </div>
      <div className="aspect-video w-12 rounded overflow-hidden transition-all hover:scale-110">
        <Link href={`/youtube/live/${videoId}`} prefetch={false}>
          <Image
            src={snippet.thumbnails.default?.url ?? ''}
            alt={snippet.title}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
    </div>
  )
}
