import { Metadata } from 'next'
import { getAggregatedSubscriberCounts } from 'apis/channel-statistics/getAggregatedSubscriberCounts'
import ChannelsIdBasePage, {
  ChannelsIdBasePageProps,
  generateBaseMetadata
} from '../_components/page/ChannelsIdBasePage'
import { ChannelsIdSubscribersTemplate } from './_components/ChannelsIdSubscribersTemplate'
import type { IntervalType } from 'features/statistics-history/types/statistics-history'

const DEFAULT_INTERVAL: IntervalType = 'weekly'
const DEFAULT_DAYS = 90

type Props = ChannelsIdBasePageProps & {
  searchParams: Promise<{
    interval?: string
    start?: string
    end?: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateBaseMetadata({
    ...props,
    namespace: 'Page.group.channelsId.subscribers.metadata'
  })
}

export default async function GroupChannelsIdSubscribersPage(props: Props) {
  const { id } = await props.params
  const searchParams = await props.searchParams

  const interval = (searchParams.interval as IntervalType) || DEFAULT_INTERVAL
  const now = new Date()
  const defaultEnd = formatDate(now)
  const defaultStartDate = new Date()
  defaultStartDate.setDate(now.getDate() - DEFAULT_DAYS)
  const defaultStart = formatDate(defaultStartDate)

  const start = searchParams.start || defaultStart
  const end = searchParams.end || defaultEnd

  const gte = toJSTStartOfDay(new Date(start))
  const lt = toJSTNextDay(new Date(end))

  const data = await getAggregatedSubscriberCounts({
    channelId: id,
    gte,
    lt,
    interval
  })

  return (
    <ChannelsIdBasePage {...props}>
      <ChannelsIdSubscribersTemplate
        data={data}
        interval={interval}
        start={start}
        end={end}
      />
    </ChannelsIdBasePage>
  )
}

function formatDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function toJSTStartOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), -9))
}

function toJSTNextDay(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 1, -9))
}
