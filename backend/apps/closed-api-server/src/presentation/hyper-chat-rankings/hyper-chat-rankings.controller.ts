import { Controller, Get, Param, Query, ParseIntPipe  } from '@nestjs/common'
import { HyperChatRankingsService } from '@app/hyper-chat-rankings/hyper-chat-rankings.service'
import { ChannelId } from '@domain/youtube'

@Controller('hyper-chat-rankings')
export class HyperChatRankingsController {
  constructor(
    private readonly hyperChatRankingsService: HyperChatRankingsService
  ) {}

  @Get('channels/:channelId/posters')
  async getPosterRanking(
    @Param('channelId') channelId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number
  ) {
    return await this.hyperChatRankingsService.findPosterRanking({
      channelId: new ChannelId(channelId),
      limit: limit ?? 50,
      offset: offset ?? 0
    })
  }

  @Get('channels/:channelId/posters/count')
  async getPosterRankingCount(@Param('channelId') channelId: string) {
    const count = await this.hyperChatRankingsService.countPosterRanking({
      channelId: new ChannelId(channelId)
    })
    return { count }
  }

  @Get('channels/:channelId/anonymous')
  async getAnonymousPoster(@Param('channelId') channelId: string) {
    return await this.hyperChatRankingsService.findAnonymousPoster({
      channelId: new ChannelId(channelId)
    })
  }
}
