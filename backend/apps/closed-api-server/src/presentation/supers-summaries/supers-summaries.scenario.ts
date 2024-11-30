import { Injectable, Logger } from '@nestjs/common'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { Now } from '@domain/lib'

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
   * それ以外：
   * SupersSummariesをみる
   **/
  async getSupersSummaries(
    args: Parameters<SupersSummariesService['findAll']>[0]
  ) {
    const { orderBy, limit, offset } = args
    if (orderBy?.some(orderBy => 'last24Hours' in orderBy)) {
      const sums = await this.supersBundlesService.sum({
        where: { actualEndTime: { gte: new Now().xDaysAgo(1) } },
        orderBy: { _sum: { amountMicros: 'desc' } },
        limit
      })
      return {
        list: sums.map(s => ({
          channelId: s.channelId.get(),
          last24Hours: s.amountMicros.toString()
        }))
      }
    } else {
      return await this.supersSummariesService.findAll(args)
    }
  }
}
