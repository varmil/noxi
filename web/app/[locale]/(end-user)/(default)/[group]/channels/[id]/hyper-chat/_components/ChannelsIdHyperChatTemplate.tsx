import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  getHyperChats,
  getHyperChatsCount,
  getHyperChatsSumAmount,
  getHyperChatsUniqueSupporters
} from 'apis/hyper-chats/getHyperChats'
import { getChannel } from 'apis/youtube/getChannel'
import { HyperChatButton } from 'components/hyper-chat/send/HyperChatButton'
import { HyperChatStats } from 'components/hyper-chat/send/HyperChatStats'
import { HyperChatHistoryList } from 'components/hyper-chat/timeline/HyperChatHistoryList'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import { Link } from 'lib/navigation'

type SortField = 'createdAt' | 'amount'

type Props = {
  channelId: string
  group: string
  page: number
  sort: SortField
}

const PAGE_SIZE = 30

export async function ChannelsIdHyperChatTemplate({
  channelId,
  group,
  page,
  sort
}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Features.hyperChat.history')

  const orderBy: {
    field: 'createdAt' | 'amount' | 'likeCount'
    order: 'asc' | 'desc'
  }[] =
    sort === 'amount'
      ? [
          { field: 'amount', order: 'desc' },
          { field: 'likeCount', order: 'desc' },
          { field: 'createdAt', order: 'desc' }
        ]
      : [{ field: 'createdAt', order: 'desc' }]

  const [hyperChats, totalCount, totalAmount, supporterCount, channel] =
    await Promise.all([
      getHyperChats({
        channelId,
        orderBy,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      }),
      getHyperChatsCount(channelId),
      getHyperChatsSumAmount(channelId),
      getHyperChatsUniqueSupporters(channelId),
      getChannel(channelId)
    ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <Sections className="lg:grid-cols-10">
      <Section className="lg:col-span-3" title={t('stats')}>
        <HyperChatStats
          totalAmount={totalAmount}
          supporterCount={supporterCount}
        />
        <div className="mt-4">
          <HyperChatButton
            channelId={channelId}
            channelTitle={channel.basicInfo.title}
            group={group}
            gender={channel.peakX.gender}
          />
        </div>
      </Section>

      <Section className="lg:col-span-7" title={t('title')}>
        <div className="mb-4 flex items-center justify-between">
          <SortTabs currentSort={sort} />
          {totalCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {totalCount}件
            </span>
          )}
        </div>
        <HyperChatHistoryList hyperChats={hyperChats} />
        {totalPages > 1 && (
          <div className="mt-6">
            <ResponsivePagination totalPages={totalPages} />
          </div>
        )}
      </Section>
    </Sections>
  )
}

function SortTabs({ currentSort }: { currentSort: SortField }) {
  return (
    <div className="flex gap-3">
      <SortTab value="createdAt" current={currentSort} labelKey="sortNewest" />
      <SortTab value="amount" current={currentSort} labelKey="sortAmount" />
    </div>
  )
}

async function SortTab({
  value,
  current,
  labelKey
}: {
  value: SortField
  current: SortField
  labelKey: 'sortNewest' | 'sortAmount'
}) {
  const t = await getTranslations('Features.hyperChat.history')
  const isActive = value === current

  return (
    <span
      className={`text-sm ${isActive ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
    >
      {isActive ? (
        t(labelKey)
      ) : (
        <Link
          href={`?sort=${value}`}
          scroll={false}
          prefetch={false}
          className="hover:text-foreground transition-colors"
        >
          {t(labelKey)}
        </Link>
      )}
    </span>
  )
}
