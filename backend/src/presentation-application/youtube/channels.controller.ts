import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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

  // NOTE: 使わないかも？
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/basic-infos')
  async getChannelBasicInfos() {
    return await this.channelsService.findAllBasicInfos({ limit: 50 })
  }
}
