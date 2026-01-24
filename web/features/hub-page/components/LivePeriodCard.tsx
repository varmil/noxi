/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type SimpleStream = {
  id: string
  title: string
  thumbnailUrl: string | undefined
}

type Props = {
  title: string
  subtitle?: string
  href: string
  streams: SimpleStream[]
}

export default function LivePeriodCard({
  title,
  subtitle,
  href,
  streams
}: Props) {
  const topTwo = streams.slice(0, 2)
  const bottomThree = streams.slice(2, 5)

  return (
    <Link href={href} prefetch={false}>
      <Card
        className="@container group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-shadow"
        data-testid="live-period-card"
      >
        <CardContent className="flex flex-col gap-3">
          {/* ヘッダー: タイトルとサブタイトルを1行で表示 */}
          <h3 className="font-semibold text-sm">
            <span className="text-foreground">{title}</span>
            {subtitle && (
              <span className="text-muted-foreground ml-2">{subtitle}</span>
            )}
          </h3>

          {streams.length > 0 ? (
            <div className="flex flex-col gap-2">
              {/* 上段: Top1, Top2 (50%ずつ) */}
              <div className="grid grid-cols-2 gap-1.5">
                {topTwo.map((stream, index) => (
                  <StreamItem
                    key={stream.id}
                    stream={stream}
                    rank={index + 1}
                  />
                ))}
              </div>

              {/* 下段: Top3, Top4, Top5 (33%ずつ) */}
              {bottomThree.length > 0 && (
                <div className="grid grid-cols-3 gap-1.5">
                  {bottomThree.map((stream, index) => (
                    <StreamItem
                      key={stream.id}
                      stream={stream}
                      rank={index + 3}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center py-4">
              <span className="text-xs text-muted-foreground">
                No data available
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function StreamItem({ stream, rank }: { stream: SimpleStream; rank: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {/* 順位バッジ */}
        <div className="absolute -left-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
          {rank}
        </div>
        {/* サムネイル */}
        <div className="aspect-video rounded-md overflow-hidden bg-muted">
          {stream.thumbnailUrl ? (
            <Image
              src={stream.thumbnailUrl}
              alt={stream.title}
              className="w-full h-full object-cover"
              width={178}
              height={100}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
      </div>
      {/* タイトル */}
      <p className="text-xs text-muted-foreground line-clamp-1">{stream.title}</p>
    </div>
  )
}
