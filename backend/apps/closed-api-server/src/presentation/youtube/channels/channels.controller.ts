import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChannelsDto } from '@presentation/youtube/channels/dto/GetChannels.dto'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelId } from '@domain/youtube'

@Controller('youtube/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getChannels(@Query() dto: GetChannelsDto) {
    return await this.channelsService.findAll({
      where: { id: dto.toIds(), group: dto.toGroup(), gender: dto.toGender() },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getChannel(@Param('id') id: string) {
    return await this.channelsService.findById(new ChannelId(id))
  }
}
