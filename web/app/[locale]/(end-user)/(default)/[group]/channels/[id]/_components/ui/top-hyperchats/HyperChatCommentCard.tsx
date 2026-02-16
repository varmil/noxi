import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { TIER_DOT_COLORS } from 'components/hyper-chat/tier-styles'
import { Link } from 'lib/navigation'

type Props = {
  hyperChat: HyperChatSchema
  rank: number
}

export default async function HyperChatCommentCard({ hyperChat, rank }: Props) {
  const feat = await getTranslations('Features.channel.overview.topHyperChats')

  const { tier, amount, message, isAnonymous, author } = hyperChat
  const displayName = author.name || feat('anonymous')
  const amountDisplay = `\uFFE5${amount.toLocaleString()}`

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {/* ランクバッジ */}
          <Badge variant="default" className="text-xs font-bold">
            {feat('rank', { rank: rank.toString() })}
          </Badge>
          {/* Tierドット + 金額 */}
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'size-2.5 rounded-full shrink-0',
                TIER_DOT_COLORS[tier]
              )}
            />
            <span className="text-lg font-bold tabular-nums">
              {amountDisplay}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* メッセージ */}
        {message ? (
          <p className="text-sm line-clamp-4 break-anywhere">{message}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {feat('noMessage')}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {/* 投稿者名 */}
        {isAnonymous ? (
          <div className="flex items-center gap-2 w-full">
            <Avatar className="size-6 shrink-0">
              <AvatarFallback className="text-xs">
                {feat('anonymous').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs text-muted-foreground truncate">
              {feat('anonymous')}
            </div>
          </div>
        ) : (
          <Link
            href={`/users/${author.username}`}
            className="flex items-center gap-2 w-full hover:opacity-80 transition-opacity"
          >
            <Avatar className="size-6 shrink-0">
              <AvatarImage src={author.image || undefined} alt={displayName} />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs text-muted-foreground truncate">
              {displayName}
            </div>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
