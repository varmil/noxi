import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = {
  stream: StreamSchema
  rank: number
}

export default async function TopLiveStreamCard({ stream, rank }: Props) {
  const feat = await getTranslations('Features.channel.overview.topLives')
  const format = await getFormatter()

  const { videoId, snippet, metrics, streamTimes } = stream
  const thumbnailUrl =
    snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url || ''
  const maxViewers = metrics.peakConcurrentViewers

  // 配信日時をフォーマット
  const streamDate = streamTimes.actualStartTime
    ? format.dateTime(new Date(streamTimes.actualStartTime), {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : ''

  return (
    <div className="cursor-pointer hover:bg-accent/50">
      <Link href={`/youtube/live/${videoId}`}>
        <div className="flex gap-3">
          {/* サムネイル */}
          <div className="relative shrink-0 w-32 h-18 rounded">
            <Image
              src={thumbnailUrl}
              alt={snippet.title}
              width={320}
              height={180}
              className="object-cover w-full h-full rounded"
            />
            {/* ランクバッジ */}
            <Badge
              variant="default"
              className="absolute -top-2 left-0 text-xs font-bold"
            >
              {feat('rank', { rank: rank.toString() })}
            </Badge>
          </div>

          {/* コンテンツ */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* タイトル */}
            <h3 className="text-sm font-medium line-clamp-2 break-anywhere mb-1">
              {snippet.title}
            </h3>

            {/* 統計情報 */}
            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
              <div>
                {feat('maxViewers', { count: format.number(maxViewers) })}
              </div>
              <div>{streamDate}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
