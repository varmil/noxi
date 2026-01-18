/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'lib/navigation'

type SimpleChannel = {
  id: string
  title: string
  thumbnailUrl: string | undefined
}

type Props = {
  title: string
  subtitle?: string
  href: string
  channels: SimpleChannel[]
}

export default function PeriodCard({ title, subtitle, href, channels }: Props) {
  return (
    <Link href={href} prefetch={false}>
      <Card className="group cursor-pointer hover:shadow-lg hover:border-primary/50">
        <CardContent className="flex gap-4">
          {/* 左側: タイトルとアバター */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              {subtitle && <p className="font-semibold text-sm">{subtitle}</p>}
            </div>
            <div className="flex items-center -space-x-2">
              {channels.slice(0, 5).map((channel, index) => (
                <Avatar
                  key={channel.id}
                  className="size-10 ring-2 ring-background"
                  style={{ zIndex: 5 - index }}
                >
                  <AvatarImage src={channel.thumbnailUrl} alt={channel.title} />
                  <AvatarFallback className="text-xs">
                    {channel.title.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* 右側: Top5リスト */}
          {channels.length > 0 && (
            <div className="max-w-25 min-w-0 shrink overflow-hidden">
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Top5
              </p>
              <ol className="space-y-0.5">
                {channels.slice(0, 5).map((channel, index) => (
                  <li
                    key={channel.id}
                    className="text-xs text-muted-foreground truncate"
                  >
                    {index + 1}. {channel.title}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {channels.length === 0 && (
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
