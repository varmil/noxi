import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChannelsDto } from '@presentation/youtube/channels/dto/GetChannels.dto'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { ChannelId, Videos } from '@domain/youtube'

@Controller('youtube/channels')
export class ChannelsController {
  constructor(
    private readonly channelsScenario: ChannelsScenario,
    private readonly channelsService: ChannelsService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getChannels(@Query() dto: GetChannelsDto) {
    return await this.channelsService.prismaFindAll({
      where: { id: dto.toIds() },
      limit: 1000
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getChannel(@Param('id') id: string) {
    return await this.channelsService.findById(new ChannelId(id))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/videos')
  async getVideosInChannel(
    @Param('id') channelId: string,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<PaginationResponse<Videos>> {
    return await this.channelsScenario.getVideosInChannel({
      where: { channelId: new ChannelId(channelId) },
      limit
    })
  }
}
