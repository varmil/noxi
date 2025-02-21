import { Period } from 'types/period'
import { getStartOf } from 'utils/period/ranking'

/**
 * histories系の集計テーブルから
 * 前回の期間の結果を取得するために
 * 必要なcreatedAtの範囲を返す
 *
 * FROM(gte): getStartOf - 1day(=24h)
 * TO(lte):   getStartOf
 *
 * NOTE:
 * last24Hoursも「たまたま」このロジックで大丈夫
 * 集計テーブルは参照していないが、たまたまこのロジックにより
 * 48h - 24hの幅の生データを参照できるので。
 *
 * @returns { gte: Date, lte: Date }
 */
export const rangeDatetimeForPreviousPeriod = (
  period: Period
): { gte: Date; lte: Date } => {
  return {
    gte: getStartOf(period).subtract(1, 'day').toDate(),
    lte: getStartOf(period).toDate()
  }
}
