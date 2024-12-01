import { Injectable, Logger } from '@nestjs/common'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { Now } from '@domain/lib'
import { ActualEndTime } from '@domain'

@Injectable()
export class SupersSummariesScenario {
  private readonly logger = new Logger(SupersSummariesScenario.name)

  constructor(
    private readonly supersBundlesService: SupersBundlesService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  /** Retuen latest summaries
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
  async getSupersSummaries(
    args: Parameters<SupersSummariesService['findAll']>[0] & { date?: Date }
  ) {
    const { where, orderBy, limit, offset, date } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      const sums = await this.supersBundlesService.sum({
        where: { ...where, ...this.whereActualEndTime(date) },
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

  private whereActualEndTime(date?: Date) {
    if (!date) {
      return { actualEndTime: { gte: new Now().xDaysAgo(1) } }
    }
    return {
      actualEndTime: { gte: new ActualEndTime(date).xDaysAgo(1), lte: date }
    }
  }
}
