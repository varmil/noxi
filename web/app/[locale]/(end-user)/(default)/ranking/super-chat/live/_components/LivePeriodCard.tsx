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
  return (
    <Link href={href} prefetch={false}>
      <Card className="@container group cursor-pointer hover:shadow-lg hover:border-primary/50">
        <CardContent className="flex gap-4">
          {/* 左側: タイトルとサムネイル */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              {subtitle && <p className="font-semibold text-sm">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-1.5">
              {streams.slice(0, 5).map((stream, index) => (
                <div
                  key={stream.id}
                  className="w-16 aspect-video rounded overflow-hidden bg-muted"
                  style={{ zIndex: 5 - index }}
                >
                  {stream.thumbnailUrl ? (
                    <Image
                      src={stream.thumbnailUrl}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                      width={120}
                      height={68}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 右側: Top5リスト */}
          {streams.length > 0 && (
            <div className="w-[clamp(0px,28cqw,240px)] shrink overflow-hidden">
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Top5
              </p>
              <ol className="space-y-0.5">
                {streams.slice(0, 5).map((stream, index) => (
                  <li
                    key={stream.id}
                    className="text-xs text-muted-foreground truncate"
                  >
                    {index + 1}. {stream.title}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {streams.length === 0 && (
            <div className="flex-1 flex items-center">
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
