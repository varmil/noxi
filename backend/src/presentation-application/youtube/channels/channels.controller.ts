import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors
} from '@nestjs/common'
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
  @Get('/')
  async getChannels() {
    return await this.channelsService.findAll({ limit: 50 })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getChannel(@Param('id') id: string) {
    return await this.channelsService.findById(new ChannelId(id))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/videos')
  async getVideosInChannel(
    @Param('id') channelId: string
  ): Promise<PaginationResponse<Videos>> {
    return await this.channelsScenario.getVideosInChannel({
      where: { channelId: new ChannelId(channelId) }
    })
  }

  // NOTE: 使わないかも？
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('/basic-infos')
  // async getChannelBasicInfos() {
  //   return await this.channelsService.findIds({ limit: 50 })
  // }
}
