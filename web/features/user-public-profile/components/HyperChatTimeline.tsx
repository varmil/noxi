import { MessagesSquare } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { getAllHyperChats } from 'apis/hyper-chats/getAllHyperChats'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { getChannels } from 'apis/youtube/getChannels'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { HyperChatTimelineItem } from './HyperChatTimelineItem'

interface Props {
  userId: number
}

async function groupByMonth(
  events: HyperChatSchema[]
): Promise<{ label: string; events: HyperChatSchema[] }[]> {
  const format = await getFormatter()
  const groups: Record<string, HyperChatSchema[]> = {}

  for (const event of events) {
    const key = format.dateTime(event.createdAt, {
      year: 'numeric',
      month: '2-digit'
    })
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, evts]) => {
      const label = format.dateTime(evts[0].createdAt, {
        year: 'numeric',
        month: 'long'
      })
      return { label, events: evts }
    })
}

export async function HyperChatTimeline({ userId }: Props) {
  const t = await getTranslations(
    'Features.userPublicProfile.hyperChatTimeline'
  )

  const hyperChats = await getAllHyperChats({
    userId,
    isAnonymous: false,
    orderBy: [{ field: 'createdAt', order: 'desc' }],
    limit: 50
  })

  if (hyperChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <MessagesSquare className="size-10 mb-3" />
        <p className="text-sm font-medium">{t('empty')}</p>
      </div>
    )
  }

  // チャンネル情報を一括取得
  const channelIds = [...new Set(hyperChats.map(hc => hc.channelId))]
  const channels = await getChannels({
    ids: channelIds,
    limit: channelIds.length
  })
  const channelMap = new Map<string, ChannelSchema>(
    channels.map(ch => [ch.basicInfo.id, ch])
  )

  const grouped = await groupByMonth(hyperChats)
  const totalCount = hyperChats.length

  return (
    <div>
      {/* Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="font-medium text-xs sm:text-sm text-muted-foreground">
          {t('countActivities', { count: totalCount })}
        </p>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-6 md:gap-8">
        {grouped.map(group => (
          <section key={group.label} aria-label={group.label}>
            {/* Month header */}
            <div className="mb-4 flex items-center gap-3">
              <Badge
                variant="outline"
                className="rounded-md border-border bg-muted px-2.5 py-1 text-xs font-semibold text-foreground"
              >
                {group.label}
              </Badge>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground font-mono">
                {group.events.length}件
              </span>
            </div>

            {/* Events */}
            <div className="pl-0 md:pl-2">
              {group.events.map((hc, idx) => (
                <HyperChatTimelineItem
                  key={hc.id}
                  hyperChat={hc}
                  channel={channelMap.get(hc.channelId)}
                  isLast={idx === group.events.length - 1}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
