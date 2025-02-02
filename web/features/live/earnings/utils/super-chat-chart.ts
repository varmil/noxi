import BigNumber from 'bignumber.js'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'
import dayjs from 'lib/dayjs'
import { calculateTotalInJPY } from 'utils/exchange-rates'

export type LiveSuperChatChartData = {
  time: string
  amount: number
  cumulativeAmount: number
}

export async function prepareChartData({
  startTime,
  endTime,
  data,
  maxDataPoints = 64
}: {
  startTime: Date
  endTime: Date
  data: SuperChatsSchema
  maxDataPoints?: number
}) {
  let cumulativeAmount = new BigNumber(0)
  const sortedData = data.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  )

  // 一応引数と実際のスパチャ時刻を比較して、より範囲が広い方を選ぶ
  if (sortedData.length > 0) {
    startTime = dayjs
      .min(dayjs(startTime), dayjs(sortedData[0].createdAt))
      .toDate()
    endTime = dayjs
      .max(dayjs(endTime), dayjs(sortedData[sortedData.length - 1].createdAt))
      .toDate()
  }
  const interval = getTimeInterval(startTime, endTime, maxDataPoints)

  // Interval分ごとのデータポイントを作成
  const result: LiveSuperChatChartData[] = []
  for (
    let time = startTime;
    time <= endTime;
    time = new Date(time.getTime() + interval * 60000)
  ) {
    const events = sortedData.filter(
      e =>
        e.createdAt.getTime() > time.getTime() - interval * 60000 &&
        e.createdAt.getTime() <= time.getTime()
    )
    const amount = (await calculateTotalInJPY(events)).toFixed(0)
    cumulativeAmount = cumulativeAmount.plus(amount)

    result.push({
      time: time.toISOString(),
      amount: Number(amount),
      cumulativeAmount: cumulativeAmount.toNumber()
    })
  }

  return result
}

/**
 * プロットするデータ数が多いときに間引く
 * @returns miniute(s) to be plotted in the chart
 */
function getTimeInterval(
  startTime: Date,
  endTime: Date,
  maxDataPoints: number
): number {
  const totalMinutes = (endTime.getTime() - startTime.getTime()) / (60 * 1000)
  let interval = 1 // デフォルトは1分間隔

  while (totalMinutes / interval > maxDataPoints) {
    interval++
  }

  return interval
}
