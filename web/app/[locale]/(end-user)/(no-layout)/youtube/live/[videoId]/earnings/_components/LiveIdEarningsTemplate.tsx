import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChartConfig } from '@/components/ui/chart'
import { getStream } from 'apis/youtube/getStream'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { getSupersBundle } from 'apis/supers/getSupersBundle'
import { LiveSuperChatChart } from 'features/live/earnings/components/LiveSuperChatChart'
import { prepareChartData } from 'features/live/earnings/utils/super-chat-chart'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/video/StatsSuperChatTotalAmountCard'

type Props = { videoId: string }

/**
 * Hide when scheduled
 **/
export async function LiveIdEarningsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  return <Earnings videoId={videoId} />
}

async function Earnings({ videoId }: { videoId: string }) {
  const [feat, stream, chats] = await Promise.all([
    getTranslations('Features.live.earnings'),
    getStream(videoId),
    getSuperChats({
      videoId,
      orderBy: [{ field: 'amountMicros', order: 'desc' }],
      limit: 2000
    })
  ])

  const {
    streamTimes: { scheduledStartTime, actualStartTime, actualEndTime },
    status,
    membersOnly
  } = stream

  // スケジュール
  if (status === 'scheduled') return <p>{feat('notice')}</p>
  // メンバー限定
  if (membersOnly) return <p>{feat('membersOnly')}</p>

  const chartData = await prepareChartData({
    startTime: new Date(scheduledStartTime ?? actualStartTime ?? Date.now()),
    endTime: actualEndTime ? new Date(actualEndTime) : new Date(),
    data: chats
  })

  const chartConfig = {
    amount: {
      label: feat('chart.superChat.amount'),
      color: 'var(--chart-1)'
    },
    cumulativeAmount: {
      label: feat('chart.superChat.cumulativeAmount'),
      color: 'var(--chart-2)'
    }
  } satisfies ChartConfig

  return (
    <section className="flex flex-col gap-8">
      <StatsSuperChatTotalAmountCard
        videoId={videoId}
        className="flex-1 grow"
      />
      <LiveSuperChatChart data={chartData} config={chartConfig} />
    </section>
  )
}
