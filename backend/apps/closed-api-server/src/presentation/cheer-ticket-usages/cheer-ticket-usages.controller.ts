import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common'
import {
  GetCheerTicketUsages,
  GetCheerTicketUsagesRanksCheered,
  GetCheerTicketUsagesRanksFan
} from '@presentation/cheer-ticket-usages/dto/GetCheerTicketUsages.dto'
import { PostCheerTicketUsagesConsume } from '@presentation/cheer-ticket-usages/dto/PostCheerTicketUsagesConsume.dto'
import { CheerTicketUsagesService } from '@app/cheer-ticket-usages/cheer-ticket-usages.service'
import { CheerTicketUsage } from '@domain/cheer-ticket-usage'

@Controller('cheer-ticket-usages')
@UseInterceptors(ClassSerializerInterceptor)
export class CheerTicketUsagesController {
  constructor(
    private readonly cheerTicketUsagesService: CheerTicketUsagesService
  ) {}

  @Get()
  async getCheerTicketUsages(@Query() dto: GetCheerTicketUsages) {
    return await this.cheerTicketUsagesService.findAll({
      where: {
        userId: dto.toUserId(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        usedAt: dto.toUsedAt()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/rankings/cheered')
  async getCheeredRanking(@Query() dto: GetCheerTicketUsages) {
    return await this.cheerTicketUsagesService.findCheeredRanking({
      where: {
        group: dto.toGroup(),
        usedAt: dto.toUsedAt()
      },
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/rankings/fan')
  async getFanRanking(@Query() dto: GetCheerTicketUsages) {
    return await this.cheerTicketUsagesService.findFanRanking({
      where: {
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        usedAt: dto.toUsedAt()
      },
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/ranks/cheered')
  async getCheeredRank(@Query() dto: GetCheerTicketUsagesRanksCheered) {
    return await this.cheerTicketUsagesService.findCheeredRank({
      where: {
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        usedAt: dto.toUsedAt()
      }
    })
  }

  @Get('/ranks/fan')
  async getFanRank(@Query() dto: GetCheerTicketUsagesRanksFan) {
    return await this.cheerTicketUsagesService.findFanRank({
      where: {
        userId: dto.toUserId(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        usedAt: dto.toUsedAt()
      }
    })
  }

  @Post('/consume')
  async consume(@Body() dto: PostCheerTicketUsagesConsume) {
    return await this.cheerTicketUsagesService.consume({
      data: new CheerTicketUsage({
        userId: dto.toUserId(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        usedCount: dto.toUsedCount(),
        usedAt: dto.toUsedAt()
      })
    })
  }
}
