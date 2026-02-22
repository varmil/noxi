import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  UseGuards
} from '@nestjs/common'
import { UpsertHyperChatModeration } from '@presentation/hyper-chat-moderations/dto/UpsertHyperChatModeration.dto'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { HyperChatModerationsService } from '@app/hyper-chat-moderations/hyper-chat-moderations.service'
import { HyperChatId } from '@domain/hyper-chat'

@Controller('hyper-chat-moderations')
export class HyperChatModerationsController {
  constructor(
    private readonly hyperChatModerationsService: HyperChatModerationsService
  ) {}

  /**
   * モデレーション情報を upsert（Warn/Ban 設定）
   */
  @Put(':hyperChatId')
  @UseGuards(JwtAuthGuard)
  async upsert(
    @Param('hyperChatId', ParseIntPipe) hyperChatId: number,
    @Body() dto: UpsertHyperChatModeration
  ) {
    await this.hyperChatModerationsService.upsert({
      hyperChatId: new HyperChatId(hyperChatId),
      status: dto.toModerationStatus()
    })
  }

  /**
   * モデレーション情報を削除（通常表示に戻す）
   */
  @Delete(':hyperChatId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('hyperChatId', ParseIntPipe) hyperChatId: number) {
    await this.hyperChatModerationsService.delete(new HyperChatId(hyperChatId))
  }
}
