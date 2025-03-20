import { Injectable } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { AmountMicros, Now } from '@domain/lib'
import { SupersBundleRepository, SupersBundleSums } from '@domain/supers-bundle'
import { SupersSummary } from '@domain/supers-summary'
import { ChannelId, Channels } from '@domain/youtube/channel'

@Injectable()
export class CreateSupersSummariesService {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly supersBundlesService: SupersBundlesService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  async execute(channels: Channels): Promise<void> {
    const now = new Now()
    const channelIds = channels.ids()
    const where: (
      d: Date
    ) => Parameters<SupersBundleRepository['sum']>[0]['where'] = (d: Date) => ({
      createdAt: { gte: d },
      channelIds
    })

    const last7Days = await this.supersBundlesService.sum({
      where: where(now.xDaysAgo(7))
    })
    const last30Days = await this.supersBundlesService.sum({
      where: where(now.xDaysAgo(30))
    })
    const last90Days = await this.supersBundlesService.sum({
      where: where(now.xDaysAgo(90))
    })
    const last1Year = await this.supersBundlesService.sum({
      where: where(now.xYearsAgo(1))
    })
    const thisWeek = await this.supersBundlesService.sum({
      where: where(now.startOfWeek())
    })
    const thisMonth = await this.supersBundlesService.sum({
      where: where(now.startOfMonth())
    })
    const thisYear = await this.supersBundlesService.sum({
      where: where(now.startOfyear())
    })

    const getAmountMicros = (data: SupersBundleSums, channelId: ChannelId) => {
      return (
        data.find(c => c.channelId.equals(channelId))?.amountMicros ??
        new AmountMicros(0)
      )
    }

    const promises = channelIds.map(async channelId => {
      await this.supersSummariesService.create({
        data: new SupersSummary({
          channelId,
          last7Days: getAmountMicros(last7Days, channelId),
          last30Days: getAmountMicros(last30Days, channelId),
          last90Days: getAmountMicros(last90Days, channelId),
          last1Year: getAmountMicros(last1Year, channelId),
          thisWeek: getAmountMicros(thisWeek, channelId),
          thisMonth: getAmountMicros(thisMonth, channelId),
          thisYear: getAmountMicros(thisYear, channelId),
          createdAt: now.get()
        })
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
