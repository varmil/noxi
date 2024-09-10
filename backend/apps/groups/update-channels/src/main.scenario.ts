import { Injectable } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { allSettled } from '@domain/lib/promise/allSettled'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly groupsService: GroupsService
  ) {}

  async execute(): Promise<void> {
    const promises = this.groupsService.findAll().map(async group => {
      console.log(`start ${group.get()} length`)

      const channels = await this.channelsInfraService.list({
        where: { channelIds: group.channelIds }
      })

      await this.channelsService.bulkSave({
        data: { channels, group }
      })
      console.log(`end ${group.get()}`)
    })

    await allSettled(promises)
  }
}
