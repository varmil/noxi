import { Injectable } from '@nestjs/common'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { Group } from '@domain/group'
import { Gender, Now } from '@domain/lib'
import { PeriodString } from '@domain/lib/period'
import { ActualEndTime, ChannelIds } from '@domain/youtube'

@Injectable()
export class SupersSummariesScenario {
  constructor(
    private readonly supersBundlesService: SupersBundlesService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  /**
   * Retuen latest summaries
   *
   * 過去24時間：
   * よりリアルタイムな正確な集計をするためにSupersBundlesを直接みる
   *
   * 過去24時間 && Date指定：
   * SupersBundlesを直接見る & 指定された日時 ~ -24 hours までの集計
   *
   * それ以外：
   * SupersSummariesをみる
   **/
  async getSupersSummaries(args: {
    where?: {
      channelIds?: ChannelIds
      group?: Group
      gender?: Gender
    }
    orderBy?: Record<PeriodString, 'asc' | 'desc'>[]
    limit?: number
    offset?: number
    date?: Date
  }) {
    const { where, orderBy, limit, offset, date } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      const sums = await this.supersBundlesService.sum({
        where: { ...where, ...this.whereCreatedAt(date) },
        orderBy: { _sum: { amountMicros: 'desc' } },
        limit,
        offset
      })
      return {
        list: sums.map(s => ({
          channelId: s.channelId.get(),
          last24Hours: s.amountMicros.toString()
        }))
      }
    } else {
      return await this.supersSummariesService.findAll({
        where,
        orderBy,
        limit,
        offset
      })
    }
  }

  /**
   * Retuen latest summaries "COUNT"
   **/
  async countSupersSummaries(args: {
    where?: {
      channelIds?: ChannelIds
      group?: Group
      gender?: Gender
    }
    orderBy?: Record<PeriodString, 'asc' | 'desc'>[]
    date?: Date
  }) {
    const { where, orderBy, date } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      return await this.supersBundlesService.countSum({
        where: { ...where, ...this.whereCreatedAt(date) }
      })
    } else {
      return await this.supersSummariesService.count({ where })
    }
  }

  private whereCreatedAt(date?: Date) {
    if (!date) {
      return { createdAt: { gte: new Now().xDaysAgo(1) } }
    }
    return {
      createdAt: { gte: new ActualEndTime(date).xDaysAgo(1), lte: date }
    }
  }
}
