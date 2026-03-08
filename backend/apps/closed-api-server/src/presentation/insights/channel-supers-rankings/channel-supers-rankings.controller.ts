import { Controller, Get, Query } from '@nestjs/common'
import { ChannelSupersRankingsService } from '@app/channel-supers-rankings/channel-supers-rankings.service'
import { GetChannelSupersRankingsDto } from './dto/get-channel-supers-rankings.dto'

@Controller('insights/channel-supers-rankings')
export class ChannelSupersRankingsController {
  constructor(
    private readonly channelSupersRankingsService: ChannelSupersRankingsService
  ) {}

  @Get()
  async getChannelSupersRankings(
    @Query() dto: GetChannelSupersRankingsDto
  ) {
    return await this.channelSupersRankingsService.findAll({
      where: {
        currentDate: dto.toCurrentDate(),
        previousDate: dto.toPreviousDate(),
        period: dto.period,
        group: dto.toGroupId()
      },
      limit: dto.limit ?? 20
    })
  }
}
