import { useFormatter } from 'next-intl'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
import { convertMicrosToAmount } from 'utils/amount'

// histories: 日付昇順でソート済み
export function useSupersCumulativeData(
  histories: SupersSummaryHistoriesSchema
) {
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
      // 集計ミスかもだがマイナスになることがあるので見た目上はゼロが最小値になるようにする
      // 例：/nijisanji/channels/UCy8P3o5XlMpJGQY4WugzdNA/super-chat
      daily: Math.max(0, daily.toNumber())
    }
  })

  return data
}
