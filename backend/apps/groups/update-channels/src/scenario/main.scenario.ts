import { Injectable, Logger } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly groupsService: GroupsService
  ) {}

  async execute(): Promise<void> {
    const groups = this.groupsService.findAll()
    for (const group of groups.get()) {
      this.logger.debug(`start ${group.get()}`)

      const channels = await this.channelsInfraService.list({
        where: { channelIds: group.channelIds }
      })

      await this.channelsService.bulkSave({
        data: { channels, group }
      })
      this.logger.debug(`end ${group.get()}`)
    }
  }
}
