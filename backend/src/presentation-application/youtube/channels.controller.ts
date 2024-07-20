import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { Videos } from '@domain/youtube'

@Controller('youtube/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

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

  // TODO: フロントエンドの getVideos をコピって
  // getVideosInChannel.ts をつくる
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/videos')
  async getVideosInChannel(
    @Query('channelId') channelId: string
  ): Promise<PaginationResponse<Videos>> {
    // TODO: playlist から取得
    return await Promise.resolve({ items: new Videos([]) })
  }

  // NOTE: 使わないかも？
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/basic-infos')
  async getChannelBasicInfos() {
    return await this.channelsService.findIds({ limit: 50 })
  }
}
