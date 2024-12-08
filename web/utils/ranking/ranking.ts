import { RankingPeriod } from 'types/ranking'
import dayjs from 'lib/dayjs'

/** 指定した期間の開始時点を返す */
export const getStartOf = (period: RankingPeriod) => {
  let start: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
      start = dayjs().subtract(24, 'hours')
      break
    case 'last7Days':
      start = dayjs().subtract(7, 'days')
      break
    case 'last30Days':
      start = dayjs().subtract(30, 'days')
      break
    case 'last90Days':
      start = dayjs().subtract(90, 'days')
      break
    case 'last1Year':
      start = dayjs().subtract(1, 'year')
      break
    case 'thisWeek':
      start = dayjs().startOf('isoWeek')
      break
    case 'thisMonth':
      start = dayjs().startOf('month')
      break
    case 'thisYear':
      start = dayjs().startOf('year')
      break
    default:
      throw new Error(`Period ${period} is not supported`)
  }

  return start
}

/**
 * 集計バッチがUTC09時（日本時間18時）に動くので基本その時点を終了時刻としている
 * 「過去24時間」だけは例外でリアルタイム集計なので現在時刻を返す
 */
export const getEndOf = (period: RankingPeriod) => {
  let end: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
      end = dayjs()
      break

    case 'last7Days':
    case 'last30Days':
    case 'last90Days':
    case 'last1Year':
      end = getLast09UTC()
      break

    case 'thisWeek':
      end = dayjs().endOf('isoWeek').set('hour', 9).set('minute', 0)
      break
    case 'thisMonth':
      end = dayjs().endOf('month').set('hour', 9).set('minute', 0)
      break
    case 'thisYear':
      end = dayjs().endOf('year').set('hour', 9).set('minute', 0)
      break

    default:
      throw new Error(`Period ${period} is not supported`)
  }

  return end
}

function getLast09UTC() {
  const now = dayjs.utc() // 現在のUTC時間
  const today09UTC = now.startOf('day').add(9, 'hour') // 今日の09:00 UTC
  // 今日の09:00が現在時刻より未来なら昨日の09:00を取得
  return now.isBefore(today09UTC) ? today09UTC.subtract(1, 'day') : today09UTC
}
