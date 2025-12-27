import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
  /** 追加のクラス名 */
  className?: string
}

export async function AdCardBeta({
  type,
  videoUrl,
  channelUrl,
  description,
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

  return (
    <Card
      className={cn(
        'pt-0 pb-2 gap-0 overflow-hidden transition-shadow',
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

      {/* 下部情報 */}
      <CardContent className="p-3 flex items-start gap-3">
        {/* チャンネルアイコン */}
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Avatar className="size-9">
            <AvatarImage src={channel.iconUrl} alt={channel.name} />
            <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </a>

        {/* テキスト情報 */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 group"
        >
          <p className="text-sm font-bold leading-tight line-clamp-2">
            {description}
          </p>
          <div className="text-xs flex items-center gap-1.5 mt-1 text-muted-foreground">
            <span className="truncate max-w-[150px]">{channel.name}</span>
            <span className="text-[10px] border border-muted-foreground/30 px-1 rounded">
              Ad
            </span>
          </div>
        </a>
      </CardContent>
    </Card>
  )
}
