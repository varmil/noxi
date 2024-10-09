import { Injectable } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { PromiseService } from '@app/lib/promise-service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly promiseService: PromiseService,
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly groupsService: GroupsService
  ) {}

  async execute(): Promise<void> {
    const promises = this.groupsService.findAll().map(async group => {
      console.log(`start ${group.get()}`)

      const channels = await this.channelsInfraService.list({
        where: { channelIds: group.channelIds }
      })

      await this.channelsService.bulkSave({
        data: { channels, group }
      })
      console.log(`end ${group.get()}`)
    })

    await this.promiseService.allSettled(promises)
  }
}
