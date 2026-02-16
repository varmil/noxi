import { getTranslations } from 'next-intl/server'
import { getHyperChats } from 'apis/hyper-chats/getHyperChats'
import dayjs from 'lib/dayjs'
import HyperChatCommentCard from './HyperChatCommentCard'

type Props = {
  channelId: string
}

export default async function TopHyperChatComments({ channelId }: Props) {
  const feat = await getTranslations('Features.channel.overview.topHyperChats')
  // 過去30日間のデータを取得
  const hyperChats = await getHyperChats({
    channelId,
    createdAfter: dayjs().subtract(30, 'days').toDate(),
    orderBy: [
      { field: 'amount', order: 'desc' },
      { field: 'likeCount', order: 'desc' },
      { field: 'createdAt', order: 'desc' }
    ],
    limit: 3
  })

  if (hyperChats.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        {feat('empty')}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {hyperChats.map((hyperChat, index) => (
        <HyperChatCommentCard
          key={hyperChat.id}
          hyperChat={hyperChat}
          rank={index + 1}
        />
      ))}
    </div>
  )
}
