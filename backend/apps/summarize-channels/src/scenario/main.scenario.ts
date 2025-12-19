import { Injectable, Logger } from '@nestjs/common'
import { CreateMembershipSummariesService } from 'apps/summarize-channels/src/service/create-membership-summaries.service'
import { SupersRankingsService } from '@app/supers-rankings/supers-rankings.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { SupersRanking } from '@domain/supers-ranking'
import { CreateSupersSummariesService } from '../service/create-supers-summaries.service'

@Injectable()
export class MainScenario {
  private readonly CHUNK_SIZE = 10
  private readonly logger = new Logger(MainScenario.name)

  constructor(
    private readonly createMembershipSummariesService: CreateMembershipSummariesService,
    private readonly createSupersSummariesService: CreateSupersSummariesService,
    private readonly channelsService: ChannelsService,
    private readonly supersRankingsService: SupersRankingsService
  ) {}

  async executeSupersSummaries(): Promise<void> {
    this.logger.log(`executeSupersSummaries: start`)

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
        await this.createSupersSummariesService.execute(channels)
      } catch (error) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, error)
      }
    }
  }

  async executeRankings(): Promise<void> {
    this.logger.log(`executeRankings: start`)

    for (const period of SupersRanking.allPeriods()) {
      // last24Hours だけはリアルタイム計算するのでDBには保持しない
      if (period.isLast24Hours()) continue

      for (const type of SupersRanking.allRankingTypes()) {
        this.logger.log(`period: ${period.get()}, type: ${type.get()}`)
        await this.supersRankingsService.createMany({
          data: { period, rankingType: type }
        })
      }
    }
  }

  async executeMembershipSummaries(): Promise<void> {
    this.logger.log(`executeMembershipSummaries: start`)

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
        await this.createMembershipSummariesService.execute(channels)
      } catch (error) {
        this.logger.error(`Error in chunk: ${index(offset)}:`, error)
      }
    }
  }
}
