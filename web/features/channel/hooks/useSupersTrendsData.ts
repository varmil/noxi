import { useFormatter } from 'next-intl'
import { SupersSummaryHistoriesSchema } from 'apis/youtube/schema/supersSummarySchema'
import { convertMicrosToAmount } from 'utils/amount'

/** @deprecated it's may be delete in the near future */
export function useSupersTrendsData(histories: SupersSummaryHistoriesSchema) {
  const format = useFormatter()
  const data = histories.map(history => {
    return {
      date: format.dateTime(history.createdAt, {
        month: '2-digit',
        day: '2-digit'
      }),
      last7Days: convertMicrosToAmount(history.last7Days).toNumber(),
      last30Days: convertMicrosToAmount(history.last30Days).toNumber(),
      last90Days: convertMicrosToAmount(history.last90Days).toNumber()
    }
  })

  return data
}
