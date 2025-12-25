import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { GetSuperChats } from '@presentation/supers/dto/GetSuperChats.dto'
import { GetSuperStickers } from '@presentation/supers/dto/GetSuperStickers.dto'
import { SuperChatsService } from '@app/super-chats/super-chats.service'
import { SuperStickersService } from '@app/super-stickers/super-stickers.service'

@Controller('supers')
@UseInterceptors(ClassSerializerInterceptor)
export class SupersController {
  constructor(
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService
  ) {}

  @Get('chats')
  async GetSuperChats(@Query() dto: GetSuperChats) {
    return await this.superChatsService.findAll({
      where: {
        videoId: dto.toVideoId(),
        channelId: dto.toChannelId(),
        userComment: dto.toUserComment(),
        createdAfter: dto.toCreatedAfter()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit()
    })
  }

  @Get('chats/count')
  async GetSuperChatsCount(@Query() dto: GetSuperChats) {
    return await this.superChatsService.count({
      where: {
        videoId: dto.toVideoId(),
        channelId: dto.toChannelId(),
        userComment: dto.toUserComment(),
        createdAfter: dto.toCreatedAfter()
      }
    })
  }

  @Get('stickers')
  async GetSuperStickers(@Query() dto: GetSuperStickers) {
    return await this.superStickersService.findAll({
      where: {
        videoId: dto.toVideoId(),
        channelId: dto.toChannelId()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit()
    })
  }
}
