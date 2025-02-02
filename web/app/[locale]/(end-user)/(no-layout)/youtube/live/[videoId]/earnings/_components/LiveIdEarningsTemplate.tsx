import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChartConfig } from '@/components/ui/chart'
import { getStream } from 'apis/youtube/getStream'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { LiveSuperChatChart } from 'features/live/earnings/components/LiveSuperChatChart'
import { prepareChartData } from 'features/live/earnings/utils/super-chat-chart'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/StatsSuperChatTotalAmountCard'

type Props = { videoId: string }

/**
 * Hide when scheduled
 **/
export async function LiveIdEarningsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  // TODO: getSuperChatsと並列通信でもいいかも？
  const stream = await getStream(videoId)
  return <Earnings stream={stream} />
}

async function Earnings({ stream }: { stream: StreamSchema }) {
  const t = await getTranslations('Features.live.earnings')
  const {
    videoId,
    streamTimes: { scheduledStartTime, actualEndTime },
    status,
    membersOnly
  } = stream

  // スケジュール
  if (status === 'scheduled' || !scheduledStartTime) return <p>{t('notice')}</p>
  // メンバー限定
  if (membersOnly) return <p>{t('membersOnly')}</p>

  // NOTE: 本当はサーバーサイドで計算したいかも
  const [chats] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'amountMicros', order: 'desc' }],
      limit: 2000
    })
  ])

  const chartData = await prepareChartData({
    startTime: new Date(scheduledStartTime),
    endTime: actualEndTime ? new Date(actualEndTime) : new Date(),
    data: chats
  })

  const chartConfig = {
    amount: {
      label: 'スパチャ金額',
      color: 'hsl(var(--chart-1))'
    },
    cumulativeAmount: {
      label: '累積金額',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig

  return (
    <section className="flex flex-col gap-8">
      <StatsSuperChatTotalAmountCard data={chats} className="flex-1 grow" />
      <LiveSuperChatChart data={chartData} config={chartConfig} />
    </section>
  )
}
