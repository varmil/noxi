import { Injectable, Logger } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 50
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelsInfraService: ChannelsInfraService
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
