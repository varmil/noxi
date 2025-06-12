import dayjs from 'lib/dayjs'
import { Period } from 'types/period'

/**
 * 指定期間の開始時点を返す
 **/
export const getStartOf = (period: Period, date?: dayjs.ConfigType) => {
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
    case 'wholePeriod':
      start = dayjs(new Date(2020, 0, 1)) // 適当に固定値
      break
    default:
      throw new Error(`Period ${period} is not supported`)
  }

  return start
}

/**
 * 指定期間の終了時点を返す
 */
export const getEndOf = (period: Period, date?: dayjs.ConfigType) => {
  const day = dayjs(date)
  let end: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
    case 'last7Days':
    case 'last30Days':
    case 'last90Days':
    case 'last1Year':
      end = day
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

/**
 * 指定期間の「最新データ更新日時」を返す
 *
 * 集計バッチがUTC09時（日本時間18時）に動くので基本その時点
 * 「過去24時間」だけは例外で30分間隔での集計
 */
export const getUpdatedAt = (period: Period, date?: dayjs.ConfigType) => {
  const day = dayjs(date)
  let updatedAt: dayjs.Dayjs

  switch (period) {
    case 'last24Hours':
      updatedAt = getLast05or35(day)
      break

    case 'last7Days':
    case 'last30Days':
    case 'last90Days':
    case 'last1Year':
    case 'thisWeek':
    case 'thisMonth':
    case 'thisYear':
      updatedAt = getLast09UTC(date)
      break

    default:
      throw new Error(`Period ${period} is not supported`)
  }

  return updatedAt
}

/**
 * 指定された日時（未指定の場合は現在）を基準に、直近の過去で05分または35分に丸めた時刻を返す。
 * 秒・ミリ秒は0に固定されます。
 *
 * @param date - 基準となる日付（dayjs.ConfigType）
 * @returns 過去の05分または35分の時刻（Dayjsオブジェクト）
 */
function getLast05or35(date?: dayjs.ConfigType): dayjs.Dayjs {
  const now = dayjs.utc(date) // 指定された日時または現在のUTC時刻
  const currentMinute = now.minute()

  if (currentMinute >= 35) {
    return now.startOf('hour').add(35, 'minute')
  } else if (currentMinute >= 5) {
    return now.startOf('hour').add(5, 'minute')
  } else {
    // 現在の分が5未満の場合、前の時間の35分を返す
    return now.subtract(1, 'hour').startOf('hour').add(35, 'minute')
  }
}

/**
 * 指定日付（未指定の場合は現在）を基準に最も近い過去の09:00 UTCを返す
 **/
function getLast09UTC(date?: dayjs.ConfigType) {
  const now = dayjs.utc(date) // 指定された日付または現在のUTC時刻を取得
  const today09UTC = now.startOf('day').add(9, 'hour') // その日の09:00 UTC
  // その日の09:00が基準時刻より未来なら昨日の09:00を取得
  return now.isBefore(today09UTC) ? today09UTC.subtract(1, 'day') : today09UTC
}
