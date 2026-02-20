import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  getHyperChats,
  getHyperChatsCount,
  getHyperChatsSumAmount,
  getHyperChatsUniqueSupporters
} from 'apis/hyper-chats/getHyperChats'
import { getChannel } from 'apis/youtube/getChannel'
import { ScrollRevealFooter } from 'components/footer/ScrollRevealFooter'
import { HyperChatButton } from 'components/hyper-chat/post/HyperChatButton'
import { HyperChatStats } from 'components/hyper-chat/post/HyperChatStats'
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

  const [hyperChats, totalCount, totalAmount, posterCount, channel] =
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
    <>
      <Sections className="max-w-[880px] lg:grid-cols-11 lg:gap-x-10 mx-auto">
        <Section
          className="lg:col-span-7 w-full max-w-[550px] mx-auto"
          title={t('title', { count: totalCount })}
        >
          <SortTabs currentSort={sort} />
          <HyperChatHistoryList hyperChats={hyperChats} />
          {totalPages > 1 && (
            <div className="mt-6">
              <ResponsivePagination totalPages={totalPages} />
            </div>
          )}
        </Section>

        {/* PC: sticky サイドバー */}
        <Section
          className="hidden lg:block lg:col-span-4 lg:sticky lg:top-16 lg:self-start"
          title={t('stats')}
        >
          <HyperChatStats
            totalAmount={totalAmount}
            posterCount={posterCount}
            channelId={channelId}
            group={group}
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
      </Sections>

      {/* スマホ: スクロールで BottomNavigation の上に固定表示 */}
      <ScrollRevealFooter>
        <HyperChatButton
          channelId={channelId}
          channelTitle={channel.basicInfo.title}
          group={group}
          gender={channel.peakX.gender}
        />
      </ScrollRevealFooter>
    </>
  )
}

function SortTabs({ currentSort }: { currentSort: SortField }) {
  return (
    <div className="flex gap-3 mb-2">
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
          replace
          className="hover:text-foreground transition-colors"
        >
          {t(labelKey)}
        </Link>
      )}
    </span>
  )
}
