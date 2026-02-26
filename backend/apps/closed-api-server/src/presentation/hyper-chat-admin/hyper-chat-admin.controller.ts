import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { GetHyperChats } from '@presentation/hyper-chats/dto/GetHyperChats.dto'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { HyperChatAdminService } from '@app/hyper-chat-admin/hyper-chat-admin.service'

@Controller('hyper-chats/admin')
@UseGuards(JwtAuthGuard)
export class HyperChatAdminController {
  constructor(
    private readonly hyperChatAdminService: HyperChatAdminService
  ) {}

  /**
   * 管理用: Ban を含む全HyperChat一覧を取得
   */
  @Get()
  async findAll(@Query() dto: GetHyperChats) {
    return await this.hyperChatAdminService.findAll({
      where: {
        userId: dto.toUserId(),
        isAnonymous: dto.toIsAnonymous(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        tier: dto.toTier(),
        createdAt: dto.toCreatedAt()
      },
      orderBy: dto.toOrderBy() ?? [{ createdAt: 'desc' }],
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  /**
   * 管理用: Ban を含む全HyperChat件数を取得
   */
  @Get('count')
  async count(@Query() dto: GetHyperChats) {
    const count = await this.hyperChatAdminService.count({
      where: {
        group: dto.toGroup(),
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
      }
    })

    return { count }
  }
}
