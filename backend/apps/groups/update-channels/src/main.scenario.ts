import { Injectable } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelIdsByGroup } from '@domain/group'
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

      const channelIds = ChannelIdsByGroup[group.get()]
      const channels = await this.channelsInfraService.list({
        where: { channelIds }
      })

      await this.channelsService.bulkSave({
        data: { channels, group }
      })
      console.log(`end ${group.get()}`)
    })

    await Promise.all(promises)
  }
}