import { Injectable, Logger } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { CreateSupersSummariesService } from '../service/create-supers-summaries.service'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 50
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly createSupersSummariesService: CreateSupersSummariesService,
    private readonly channelsService: ChannelsService
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
        await this.createSupersSummariesService.execute(channels)
        console.timeEnd(`processChunk: ${index(offset)}`)
      } catch (error) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, error)
      }
    }
  }
}
