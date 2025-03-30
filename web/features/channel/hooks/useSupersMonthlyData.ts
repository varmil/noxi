import { useFormatter } from 'next-intl'
import { SupersMonthlySummariesSchema } from 'apis/youtube/schema/supersMonthlySummarySchema'
import dayjs from 'lib/dayjs'
import { convertMicrosToAmount } from 'utils/amount'

// 日付昇順でソート済み
export function useSupersMonthlyData(summaries: SupersMonthlySummariesSchema) {
  const format = useFormatter()

  // 現在の月を基準に過去12ヶ月のリストを作成
  const now = dayjs()
  const past12Months = Array.from({ length: 12 })
    .map((_, i) => now.subtract(i, 'month').startOf('month').format('YYYY-MM'))
    .reverse() // 古い順に並べる

  // データをマップしやすい形に変換
  const summaryMap = new Map(
    summaries.map(summary => [
      dayjs(summary.createdAt).startOf('month').format('YYYY-MM'),
      convertMicrosToAmount(summary.thisMonth).toNumber()
    ])
  )

  // 足りない月を 0 で補完
  const data = past12Months.map(month => ({
    date: format.dateTime(dayjs(month).toDate(), {
      year: 'numeric',
      month: '2-digit'
    }),
    thisMonth: summaryMap.get(month) ?? 0
  }))

  return data
}
