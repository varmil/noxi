import { useFormatter } from 'next-intl'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
import { convertMicrosToAmount } from 'utils/amount'

// histories: 日付昇順でソート済み
export function useCumulativeData(histories: SupersSummaryHistoriesSchema) {
  const format = useFormatter()

  const data = histories.map((history, index) => {
    const prevHistory = histories[index - 1]
    const daily = prevHistory
      ? convertMicrosToAmount(history.thisMonth - prevHistory.thisMonth)
      : convertMicrosToAmount(history.thisMonth)

    return {
      date: format.dateTime(history.createdAt, {
        month: '2-digit',
        day: '2-digit'
      }),
      monthly: convertMicrosToAmount(history.thisMonth).toNumber(),
      daily: daily.toNumber()
    }
  })

  return data
}
