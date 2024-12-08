import dayjs from 'lib/dayjs'
import { RankingPeriod } from 'types/ranking'

/** 指定した期間の開始時点を返す */
export const getStartOf = (period: RankingPeriod, date?: dayjs.ConfigType) => {
  const day = dayjs(date)
  let start: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
      start = day.subtract(24, 'hours')
      break
    case 'last7Days':
      start = day.subtract(7, 'days')
      break
    case 'last30Days':
      start = day.subtract(30, 'days')
      break
    case 'last90Days':
      start = day.subtract(90, 'days')
      break
    case 'last1Year':
      start = day.subtract(1, 'year')
      break
    case 'thisWeek':
      start = day.startOf('isoWeek')
      break
    case 'thisMonth':
      start = day.startOf('month')
      break
    case 'thisYear':
      start = day.startOf('year')
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
export const getEndOf = (period: RankingPeriod, date?: dayjs.ConfigType) => {
  const day = dayjs(date)
  let end: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
      end = day
      break

    case 'last7Days':
    case 'last30Days':
    case 'last90Days':
    case 'last1Year':
      end = getLast09UTC(date)
      break

    case 'thisWeek':
      end = day.endOf('isoWeek').set('hour', 9).set('minute', 0)
      break
    case 'thisMonth':
      end = day.endOf('month').set('hour', 9).set('minute', 0)
      break
    case 'thisYear':
      end = day.endOf('year').set('hour', 9).set('minute', 0)
      break

    default:
      throw new Error(`Period ${period} is not supported`)
  }

  return end
}

function getLast09UTC(date?: dayjs.ConfigType) {
  const now = dayjs.utc(date) // 指定された日付または現在のUTC時刻を取得
  const today09UTC = now.startOf('day').add(9, 'hour') // その日の09:00 UTC
  // その日の09:00が基準時刻より未来なら昨日の09:00を取得
  return now.isBefore(today09UTC) ? today09UTC.subtract(1, 'day') : today09UTC
}
