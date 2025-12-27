import { MessageCircle } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'components/styles/Image'

const FORM_URL = 'https://forms.gle/Dt3fdmsPcrY5NG7z6'
const THUMBNAIL_URL = '/ads/wanted-from-talent.png'
const ICON_URL = 'vcharts/padding-100px.png'
const TITLE = 'VCharts 運営局'
const MESSAGE =
  'トップページ上部。年間成長率5,000%のVChartsに掲載。1週間3,000円（税込）'

interface Props {
  className?: string
}

export function AdWantedFromTalentCardBeta({ className }: Props) {
  return (
    <Card
      className={cn(
        'pt-0 pb-2 gap-0 overflow-hidden bg-card h-full',
        className
      )}
    >
      {/* サムネイル */}
      <div className="relative w-full aspect-video">
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <Image
            src={THUMBNAIL_URL}
            alt={MESSAGE}
            width={1280}
            height={720}
            className="object-contain hover:opacity-95 transition-opacity"
          />
        </a>

        <Badge
          className={cn(
            'absolute top-2 right-2 z-10 text-xs font-bold border-none text-white',
            'bg-blue-600 hover:bg-blue-700'
          )}
        >
          Official PR
        </Badge>
      </div>

      {/* チャンネル情報 */}
      <CardContent className="py-2 px-3 flex items-center gap-3">
        {/* アイコン */}
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Avatar className="size-8 hover:scale-105">
            <AvatarImage src={ICON_URL} alt={TITLE} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </a>

        {/* タイトル */}
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 group"
        >
          <div className="text-sm flex items-center gap-1.5 text-muted-foreground">
            <span className="truncate block hover:underline">{TITLE}</span>
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
            'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800'
          )}
        >
          <MessageCircle
            className={cn(
              'absolute -top-2 -left-1 size-4 fill-current',
              'text-blue-500'
            )}
          />
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <p className="text-sm text-foreground font-medium line-clamp-2">
              {MESSAGE}
            </p>
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
