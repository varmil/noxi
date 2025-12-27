import { MessageCircle } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getChannel } from 'apis/youtube/data-api/getChannel'
import { getVideo } from 'apis/youtube/data-api/getVideo'
import Image from 'components/styles/Image'

export type AdType = 'official' | 'fan'

interface AdCardProps {
  /** 広告の種類（本人PR or ファン応援） */
  type: AdType
  /** YouTube動画のURL */
  videoUrl: string
  /** YouTubeチャンネルのURL（ハンドル形式・ID形式どちらも対応） */
  channelUrl: string
  /** 広告のキャッチコピー */
  description: string
  /** ファンネーム（推し広告の場合に表示） */
  fanName?: string
  /** 追加のクラス名 */
  className?: string
}

export async function AdCardBeta({
  type,
  videoUrl,
  channelUrl,
  description,
  fanName,
  className
}: AdCardProps) {
  const [video, channel] = await Promise.all([
    getVideo(videoUrl),
    getChannel(channelUrl)
  ])

  const isOfficial = type === 'official'
  const labelText = isOfficial ? 'Official PR' : '推し広告'
  const labelColorClass = isOfficial
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-pink-600 hover:bg-pink-700'
  const cardStyleClass = isOfficial ? 'bg-card' : 'bg-card'
  const messageBgClass = isOfficial
    ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800'
    : 'bg-pink-50 border-pink-200 dark:bg-pink-950/50 dark:border-pink-800'
  const messageIconClass = isOfficial ? 'text-blue-500' : 'text-pink-500'

  return (
    <Card
      className={cn(
        'pt-0 pb-2 gap-0 overflow-hidden',
        cardStyleClass,
        className
      )}
    >
      {/* 動画サムネイル */}
      <div className="relative w-full aspect-video">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <Image
            src={video.thumbnailUrl}
            alt={description}
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover hover:opacity-95 transition-opacity"
          />
        </a>

        <Badge
          className={cn(
            'absolute top-2 left-2 z-10 text-xs font-bold border-none text-white',
            labelColorClass
          )}
        >
          {labelText}
        </Badge>
      </div>

      {/* チャンネル情報 */}
      <CardContent className="py-2 px-3 flex items-center gap-3">
        {/* チャンネルアイコン */}
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Avatar className="size-8 hover:scale-105">
            <AvatarImage src={channel.iconUrl} alt={channel.name} />
            <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </a>

        {/* チャンネル名 */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 group"
        >
          <div className="text-sm flex items-center gap-1.5 text-muted-foreground">
            <span className="truncate block hover:underline">
              {channel.name}
            </span>
          </div>
        </a>

        <span className="text-[10px] text-muted-foreground/70 border border-muted-foreground/30 px-1.5 py-0.5 rounded">
          PR
        </span>
      </CardContent>

      {/* 吹き出しメッセージ */}
      <CardFooter className="flex-1 mt-1 px-3 pb-2">
        <div
          className={cn(
            'relative rounded-xl border px-3 py-2 w-full h-full',
            messageBgClass
          )}
        >
          <MessageCircle
            className={cn(
              'absolute -top-2 -left-1 size-4 fill-current',
              messageIconClass
            )}
          />
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <p className="text-sm text-foreground font-medium line-clamp-2">
              {description}
            </p>
          </a>
          {/* 推し広告の場合のみファンネームを表示 */}
          {!isOfficial && (
            <p className="text-xs text-muted-foreground mt-2 text-right">
              Presented by {fanName || 'fan'}
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
