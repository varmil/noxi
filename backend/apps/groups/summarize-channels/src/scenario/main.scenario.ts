import { Injectable, Logger } from '@nestjs/common'
import BigNumber from 'bignumber.js'
import { AmountMicros } from '@domain'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Now } from '@domain/lib'
import { AmountMicrosSum } from '@domain/supers-bundle'
import { SupersSummary } from '@domain/supers-summary'
import { ChannelId, Channels } from '@domain/youtube/channel'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 50
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly channelsService: ChannelsService,
    private readonly groupsService: GroupsService,
    private readonly supersBundlesService: SupersBundlesService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  async execute(): Promise<void> {
    let offset = 0
    const index = (offset: number) => offset / this.CHUNK_SIZE
    while (true) {
      try {
        const channels = await this.channelsService.findAll({
          orderBy: [{ subscriberCount: 'desc' }],
          limit: this.CHUNK_SIZE,
          offset
        })
        if (channels.length === 0) break
        offset += this.CHUNK_SIZE

        console.time(`processChunk: ${index(offset)}`)
        await this.processChunk(channels)
        console.timeEnd(`processChunk: ${index(offset)}`)
      } catch (error) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, error)
      }
    }
  }

  private async processChunk(channels: Channels): Promise<void> {
    const now = new Now()
    const channelIds = channels.ids()
    const where = (d: Date) => ({ channelIds, actualEndTime: { gte: d } })

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

    const getAmountMicros = (data: AmountMicrosSum[], channelId: ChannelId) => {
      return (
        data.find(c => c.channelId.equals(channelId))?.amountMicros ??
        new AmountMicros(BigNumber(0))
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
