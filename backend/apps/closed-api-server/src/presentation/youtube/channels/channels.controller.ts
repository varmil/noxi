import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetChannelsDto } from '@presentation/youtube/channels/dto/GetChannels.dto'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelId } from '@domain/youtube'

@Controller('youtube/channels')
@UseInterceptors(ClassSerializerInterceptor)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async getChannels(@Query() dto: GetChannelsDto) {
    return await this.channelsService.findAll({
      where: {
        id: dto.toIds(),
        title: dto.toTitle(),
        group: dto.toGroup(),
        gender: dto.toGender()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('/count')
  async getChannelsCount(@Query() dto: GetChannelsDto) {
    return await this.channelsService.count({
      where: { group: dto.toGroup(), gender: dto.toGender() }
    })
  }

  @Get(':id')
  async getChannel(@Param('id') id: string) {
    const channel = await this.channelsService.findById(new ChannelId(id))
    if (!channel) {
      throw new NotFoundException(`channel not found for ${id}`)
    }
    return channel
  }
}
