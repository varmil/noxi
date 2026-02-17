import { Lightbulb } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getAllHyperChats,
  getAllHyperChatsCount
} from 'apis/hyper-chats/getAllHyperChats'
import { getChannels } from 'apis/youtube/getChannels'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { Link } from 'lib/navigation'
import { HyperChatScrambleList } from './HyperChatScrambleList'

type Props = {
  page: number
}

const PAGE_SIZE = 50

export async function HyperChatScrambleTemplate({ page }: Props) {
  const t = await getTranslations('Pages.hyperChatScramble')

  const [hyperChats, totalCount] = await Promise.all([
    getAllHyperChats({
      orderBy: [{ field: 'createdAt', order: 'desc' }],
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE
    }),
    getAllHyperChatsCount()
  ])

  // フロントエンドソート: 有料を先に（amount DESC → createdAt DESC）、無料を後に（createdAt DESC）
  const paid = hyperChats
    .filter(hc => hc.amount > 0)
    .sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  const free = hyperChats
    .filter(hc => hc.amount === 0)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  const sorted = [...paid, ...free]

  // チャンネル情報をバッチ取得
  const uniqueChannelIds = [...new Set(hyperChats.map(hc => hc.channelId))]
  const channels =
    uniqueChannelIds.length > 0
      ? await getChannels({
          ids: uniqueChannelIds,
          limit: uniqueChannelIds.length
        })
      : []

  const channelMap = new Map<string, ChannelSchema>(
    channels.map(ch => [ch.basicInfo.id, ch])
  )

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="w-full max-w-[550px] mx-auto">
      <div className="flex items-center justify-end mb-12">
        <Link
          href="/hyper-chat/about"
          prefetch={false}
          className="flex items-center text-sm text-muted-foreground hover:underline"
        >
          <Lightbulb className="mr-1 size-4" />
          {t('aboutLink')}
        </Link>
      </div>

      <HyperChatScrambleList hyperChats={sorted} channelMap={channelMap} />

      {totalPages > 1 && (
        <div className="mt-10">
          <ResponsivePagination totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
