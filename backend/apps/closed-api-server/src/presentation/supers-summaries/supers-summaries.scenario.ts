import { Injectable } from '@nestjs/common'
import { AmountMicrosDto } from '@presentation/supers-summaries/dto/GetSupersSummaries.dto'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { GroupId } from '@domain/group'
import { Gender, Now } from '@domain/lib'
import { PeriodString } from '@domain/lib/period'
import { SupersBundleSumWhere } from '@domain/supers-bundle'
import { SupersSummaryFindAllWhere } from '@domain/supers-summary'
import { ActualEndTime, ChannelIds } from '@domain/youtube'

interface WHERE {
  channelIds?: ChannelIds
  group?: GroupId
  gender?: Gender
  amountMicros?: AmountMicrosDto
}
type OrderBy = Record<PeriodString, 'asc' | 'desc'>[]

@Injectable()
export class SupersSummariesScenario {
  constructor(
    private readonly supersBundlesService: SupersBundlesService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  /**
   * Return latest summaries
   * １円以上のみSELECTするので /channels/ranking ページ専用
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
    where?: WHERE
    orderBy?: OrderBy
    limit?: number
    offset?: number
    date?: Date
  }) {
    const { amountMicros, ...where } = args.where || {}
    const { orderBy, limit, offset, date } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      const sums = await this.supersBundlesService.sum({
        where: {
          ...where,
          ...this.whereCreatedAt(date),
          ...this.whereAmountUsingBundle(amountMicros)
        },
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
        where: {
          ...where,
          ...this.whereAmountUsingSummary(amountMicros)
        },
        orderBy,
        limit,
        offset
      })
    }
  }

  /**
   * Return latest summaries "COUNT"
   * １円以上のみCOUNTするので /channels/ranking ページ専用
   **/
  async countSupersSummaries(args: {
    where?: WHERE
    orderBy?: OrderBy
    date?: Date
  }) {
    const { amountMicros, ...where } = args.where || {}
    const { orderBy, date } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      return await this.supersBundlesService.countSum({
        where: {
          ...where,
          ...this.whereCreatedAt(date),
          ...this.whereAmountUsingBundle(amountMicros)
        }
      })
    } else {
      return await this.supersSummariesService.count({
        where: {
          ...where,
          ...this.whereAmountUsingSummary(amountMicros)
        }
      })
    }
  }

  /** last24Hoursの「日時指定」 */
  private whereCreatedAt(date?: Date) {
    if (!date) {
      return { createdAt: { gte: new Now().xDaysAgo(1) } }
    }
    return {
      createdAt: { gte: new ActualEndTime(date).xDaysAgo(1), lte: date }
    }
  }

  /** last24Hoursの「金額指定」 */
  private whereAmountUsingBundle(
    amountMicros?: AmountMicrosDto
  ): { amountMicros?: SupersBundleSumWhere['amountMicros'] } | undefined {
    if (!amountMicros) {
      return undefined
    }
    return {
      amountMicros: { [amountMicros.operator]: amountMicros.value }
    }
  }

  /** last24Hours以外の「金額指定」 */
  private whereAmountUsingSummary(
    amountMicros?: AmountMicrosDto
  ): SupersSummaryFindAllWhere | undefined {
    if (!amountMicros) {
      return undefined
    }
    return {
      [amountMicros.period]: {
        [amountMicros.operator]: amountMicros.value
      }
    }
  }
}
