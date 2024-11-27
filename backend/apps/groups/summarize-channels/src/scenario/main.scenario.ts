import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { SupersBundlesService } from '@app/supers-bundles/supers-bundles.service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Now } from '@domain/lib'
import { Channels } from '@domain/youtube/channel'

@Injectable()
export class MainScenario {
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
    while (true) {
      try {
        const channels = await this.channelsService.findAll({
          limit: 50,
          offset
        })
        if (channels.length === 0) break
        offset += 50

        await this.processChannels(channels)
      } catch (error) {
        this.logger.error(`Error processing chunk: ${offset / 50}:`, error)
      }
    }

    // DEBUG
    // const now = new Now()
    // this.logger.log({
    //   last7days: now.xDaysAgo(7).toISOString(),
    //   last30days: now.xDaysAgo(30).toISOString(),
    //   last90days: now.xDaysAgo(90).toISOString(),
    //   last1year: now.xYearsAgo(1).toISOString(),
    //   week: now.startOfWeek().toISOString(),
    //   month: now.startOfMonth().toISOString(),
    //   year: now.startOfyear().toISOString()
    // })
    // DEBUG END
  }

  private async processChannels(channels: Channels): Promise<void> {
    const now = new Now()
    const sum = await this.supersBundlesService.sum({
      where: {
        channelIds: channels.ids(),
        actualEndTime: { gte: now.startOfWeek() }
      }
    })

    this.logger.debug({ sum: JSON.stringify(sum, null, 2) })
  }
}
