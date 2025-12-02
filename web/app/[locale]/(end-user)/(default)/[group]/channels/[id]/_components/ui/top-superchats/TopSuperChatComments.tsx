import { getTranslations } from 'next-intl/server'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import dayjs from 'lib/dayjs'
import SuperChatCommentCard from './SuperChatCommentCard'

type Props = {
  channelId: string
}

export default async function TopSuperChatComments({ channelId }: Props) {
  const feat = await getTranslations('Features.channel.overview.topSuperChats')

  // 過去30日間のデータを取得
  const thirtyDaysAgo = dayjs().subtract(30, 'days').toDate()

  const superChats = await getSuperChats({
    channelId,
    createdAfter: thirtyDaysAgo,
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit: 3
  })

  if (superChats.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        {feat('noComments')}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {superChats.map((superChat, index) => (
        <SuperChatCommentCard
          key={superChat.id}
          superChat={superChat}
          rank={index + 1}
        />
      ))}
    </div>
  )
}
