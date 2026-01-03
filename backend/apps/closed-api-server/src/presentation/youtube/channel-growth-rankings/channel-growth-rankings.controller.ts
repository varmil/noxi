import { Controller, Get, Query } from '@nestjs/common'
import { ChannelGrowthRankingsService } from '@app/channel-growth-rankings/channel-growth-rankings.service'
import { GetChannelGrowthRankingsDto } from './dto/get-channel-growth-rankings.dto'

@Controller('youtube/channel-growth-rankings')
export class ChannelGrowthRankingsController {
  constructor(
    private readonly channelGrowthRankingsService: ChannelGrowthRankingsService
  ) {}

  @Get()
  async getChannelGrowthRankings(@Query() dto: GetChannelGrowthRankingsDto) {
    return await this.channelGrowthRankingsService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      },
      limit: 20
    })
  }
}
