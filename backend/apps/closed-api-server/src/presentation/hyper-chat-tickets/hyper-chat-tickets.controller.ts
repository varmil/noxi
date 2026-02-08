import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { UseTicket } from '@presentation/hyper-chat-tickets/dto/UseTicket.dto'
import { HyperChatTicketsScenario } from '@presentation/hyper-chat-tickets/hyper-chat-tickets.scenario'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { HyperChatTicketProgressService } from '@app/hyper-chat-ticket-progress/hyper-chat-ticket-progress.service'
import { HyperChatTicketsService } from '@app/hyper-chat-tickets/hyper-chat-tickets.service'
import { User } from '@domain/user'

@Controller('hyper-chat-tickets')
export class HyperChatTicketsController {
  constructor(
    private readonly hyperChatTicketsService: HyperChatTicketsService,
    private readonly hyperChatTicketProgressService: HyperChatTicketProgressService,
    private readonly hyperChatTicketsScenario: HyperChatTicketsScenario
  ) {}

  /**
   * 有効なチケット一覧を取得（未使用 & 有効期限内）
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyTickets(@Req() req: { user: User }) {
    const tickets = await this.hyperChatTicketsService.findValidByUserId(
      req.user.id
    )

    return tickets
  }

  /**
   * チケットを使用してHyperChatを作成
   */
  @Post('use')
  @UseGuards(JwtAuthGuard)
  async useTicket(@Req() req: { user: User }, @Body() dto: UseTicket) {
    try {
      const hyperChat = await this.hyperChatTicketsScenario.useTicket({
        ticketId: dto.toTicketId(),
        userId: req.user.id,
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        message: dto.toMessage()
      })

      return hyperChat
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  /**
   * ログインボーナス進捗を記録し、3日目ならチケット付与
   */
  @Post('progress')
  @UseGuards(JwtAuthGuard)
  async recordProgress(@Req() req: { user: User }) {
    const result =
      await this.hyperChatTicketProgressService.recordLoginAndGrantIfEligible({
        where: { userId: req.user.id }
      })

    return {
      granted: result.granted.get(),
      currentCount: result.currentCount.get(),
      progressIncremented: result.progressIncremented.get()
    }
  }
}
