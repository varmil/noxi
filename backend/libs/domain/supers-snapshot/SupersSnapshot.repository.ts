import { GroupId } from '@domain/group'
import { Gender } from '@domain/lib'
import { SupersSnapshots } from './SupersSnapshots.collection'

export type SnapshotPeriod = 'weekly' | 'monthly'

export interface SupersSnapshotRepository {
  /**
   * 指定日付時点のスナップショットランキングを取得
   * @param targetDate 週末または月末の日付 (JST)
   * @param period 'weekly' → thisWeek カラム, 'monthly' → thisMonth カラムでソート
   */
  findRanking: (args: {
    where: {
      targetDate: Date
      period: SnapshotPeriod
      group?: GroupId
      gender?: Gender
    }
    limit?: number
    offset?: number
  }) => Promise<SupersSnapshots>

  /**
   * 指定日付時点のスナップショットランキングの件数を取得
   */
  countRanking: (args: {
    where: {
      targetDate: Date
      period: SnapshotPeriod
      group?: GroupId
      gender?: Gender
    }
  }) => Promise<number>
}
