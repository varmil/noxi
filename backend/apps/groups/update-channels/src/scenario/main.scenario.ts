import { Injectable, Logger } from '@nestjs/common'
import { ChannelRegistrationsService } from '@app/channel-registrations/channel-registrations.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Status } from '@domain/channel-registration'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  private readonly REGISTRATION_LIMIT = 50
  private readonly CHUNK_SIZE = 50
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelRegistrationsService: ChannelRegistrationsService,
    private readonly channelsInfraService: ChannelsInfraService
  ) {}

  async executeRegistrations(): Promise<void> {
    const channelRegistrations = await this.channelRegistrationsService.findAll(
      {
        where: { status: new Status('approved') },
        orderBy: { appliedAt: 'asc' },
        limit: this.REGISTRATION_LIMIT
      }
    )
    if (channelRegistrations.length === 0) return

    const channels = (
      await this.channelsInfraService.list({
        where: { channelIds: channelRegistrations.ids() }
      })
    ).merge(channelRegistrations)

    await this.channelsService.bulkCreate({
      data: channels
    })

    await this.channelRegistrationsService.updateMany({
      where: { channelIds: channels.ids() },
      data: { status: new Status('done') }
    })
  }

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

        this.logger.log(`processChunk: ${index(offset)}`)

        const channelsFromApi = await this.channelsInfraService.list({
          where: { channelIds: channels.ids() }
        })
        await this.channelsService.bulkUpdate({ data: channelsFromApi })
      } catch (error) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, error)
      }
    }
  }
}
