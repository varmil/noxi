import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SuperChatSchema } from 'apis/youtube/schema/superChatSchema'
import CommentAvatar from 'components/comment/comment/CommentAvatar'

type Props = {
  superChat: SuperChatSchema
  rank: number
}

export default async function SuperChatCommentCard({ superChat, rank }: Props) {
  const feat = await getTranslations('Features.channel.overview.topSuperChats')
  const format = await getFormatter()

  const { amountDisplayString, userComment, author } = superChat

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {/* ランクバッジ */}
          <Badge variant="default" className="text-xs font-bold">
            {feat('rank', { rank: rank.toString() })}
          </Badge>
          {/* 金額 */}
          <div className="text-lg font-bold tabular-nums">
            {amountDisplayString}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* コメントメッセージ */}
        {userComment ? (
          <p className="text-sm line-clamp-4 break-anywhere">{userComment}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {feat('noMessage')}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {/* 投稿者名 */}
        <div className="flex items-center gap-2 w-full">
          <CommentAvatar
            profileImageUrl={author.profileImageUrl}
            displayName={author.displayName}
          />
          <div className="text-xs text-muted-foreground truncate">
            {author.displayName}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
