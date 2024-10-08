import { PropsWithChildren } from 'react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
export default function StreamImg({
  stream,
  children
}: PropsWithChildren<{ stream: StreamSchema }>) {
  const {
    videoId,
    snippet: { title, thumbnails }
  } = stream
  return (
    // <div className="relative aspect-video w-full sm:w-[220px] rounded-lg overflow-hidden">
    <div className="relative aspect-video w-full rounded-lg overflow-hidden">
      <Link href={`/youtube/live/${videoId}`} prefetch={true}>
        <Image
          src={thumbnails.standard?.url ?? ''}
          alt={title}
          className="object-cover w-full h-full"
          width={348.8}
          height={196.2}
        />
        {children}
      </Link>
    </div>
  )
}
