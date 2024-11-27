import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly groupsService: GroupsService,
    private readonly supersSummariesService: SupersSummariesService
  ) {}

  async execute(): Promise<void> {
    await this.processGroups()
  }

  private async processGroups() {
    for (const group of this.groupsService.findAll()) {
      try {
        await Promise.resolve()
        // this.logger.debug(`start ${group.get()}`)
        // const channels = await this.channelsInfraService.list({
        //   where: { channelIds: group.channelIds }
        // })
        // await this.channelsService.bulkSave({
        //   data: { channels, group }
        // })
        // this.logger.debug(`end ${group.get()}`)
      } catch (error) {
        this.logger.error(`Error processing group ${group.get()}:`, error)
      }
    }
  }
}
