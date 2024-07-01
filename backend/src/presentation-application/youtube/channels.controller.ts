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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getChannels() {
    return await this.channelsService.findAll()
  }
}
