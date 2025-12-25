import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import {
  
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
export class SupersController {
  constructor(
    private readonly superChatsService: SuperChatsService,
    private readonly superStickersService: SuperStickersService
  ) {}

  @Get('chats')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(7 * 24 * 3600 * 1000)
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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(7 * 24 * 3600 * 1000)
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
