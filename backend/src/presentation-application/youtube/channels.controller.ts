import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors
} from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'

@Controller('youtube/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  // フロントエンドから呼ぶのはこっち
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getChannels() {
    return await this.channelsService.findAll({ limit: 50 })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getChannel(@Param('id') id: string) {
    return await this.channelsService.findById(id)
  }

  // NOTE: 使わないかも？
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/basic-infos')
  async getChannelBasicInfos() {
    return await this.channelsService.findIds({ limit: 50 })
  }
}
