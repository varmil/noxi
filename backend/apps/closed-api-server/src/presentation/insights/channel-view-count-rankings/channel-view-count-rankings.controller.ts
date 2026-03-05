import { Controller, Get, Query } from '@nestjs/common'
import { ChannelViewCountRankingsService } from '@app/channel-view-count-rankings/channel-view-count-rankings.service'
import { GetChannelViewCountRankingsDto } from './dto/get-channel-view-count-rankings.dto'

@Controller('insights/channel-view-count-rankings')
export class ChannelViewCountRankingsController {
  constructor(
    private readonly channelViewCountRankingsService: ChannelViewCountRankingsService
  ) {}

  @Get()
  async getChannelViewCountRankings(
    @Query() dto: GetChannelViewCountRankingsDto
  ) {
    return await this.channelViewCountRankingsService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      },
      limit: dto.limit ?? 20
    })
  }
}
