import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { CreateHyperChatPaymentIntent } from '@presentation/hyper-chats/dto/CreateHyperChatPaymentIntent.dto'
import { GetHyperChats } from '@presentation/hyper-chats/dto/GetHyperChats.dto'
import { GetRecentHyperChats } from '@presentation/hyper-chats/dto/GetRecentHyperChats.dto'
import { HyperChatsScenario } from '@presentation/hyper-chats/hyper-chats.scenario'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { HyperChatsService } from '@app/hyper-chats/hyper-chats.service'
import { User } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Controller('hyper-chats')
export class HyperChatsController {
  constructor(
    private readonly hyperChatsService: HyperChatsService,
    private readonly hyperChatsScenario: HyperChatsScenario
  ) {}

  /**
   * 複数チャンネルの最新HyperChatを取得（過去24時間）
   * channelIdをキーとしたオブジェクトを返却
   */
  @Get('recent')
  async getRecent(@Query() dto: GetRecentHyperChats) {
    const result = await this.hyperChatsService.findRecentByChannelIds({
      channelIds: dto.toChannelIds()
    })

    // Map → Object に変換
    const response: Record<string, unknown> = {}
    for (const [channelId, hyperChats] of result) {
      response[channelId] = hyperChats
    }

    return response
  }

  /**
   * Stripe PaymentIntentを作成してclientSecretを返却（Elements用）
   */
  @Post('payment-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(
    @Req() req: { user: User },
    @Body() dto: CreateHyperChatPaymentIntent
  ) {
    try {
      const result = await this.hyperChatsScenario.createPaymentIntent({
        userId: req.user.id,
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        tier: dto.toTier(),
        message: dto.toMessage()
      })

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw error
    }
  }

  /**
   * チャンネルのHyperChat一覧を取得（確定済みのみ）
   */
  @Get('channels/:channelId')
  async getByChannel(
    @Param('channelId') channelId: string,
    @Query() dto: GetHyperChats
  ) {
    const hyperChats = await this.hyperChatsService.findAll({
      where: {
        channelId: new ChannelId(channelId),
        group: dto.toGroup(),
        gender: dto.toGender()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })

    return hyperChats
  }

  /**
   * 条件に一致するHyperChat件数を取得
   */
  @Get('channels/:channelId/count')
  async getCountByChannel(
    @Param('channelId') channelId: string,
    @Query() dto: GetHyperChats
  ) {
    const count = await this.hyperChatsService.count({
      where: {
        channelId: new ChannelId(channelId),
        group: dto.toGroup(),
        gender: dto.toGender()
      }
    })

    return { count }
  }

  /**
   * 条件に一致するHyperChatの合計金額を取得
   */
  @Get('channels/:channelId/sum-amount')
  async getSumAmountByChannel(
    @Param('channelId') channelId: string,
    @Query() dto: GetHyperChats
  ) {
    const sumAmount = await this.hyperChatsService.sumAmount({
      where: {
        channelId: new ChannelId(channelId),
        group: dto.toGroup(),
        gender: dto.toGender()
      }
    })

    return { sumAmount }
  }

  /**
   * 条件に一致するユニークな応援者数を取得
   */
  @Get('channels/:channelId/unique-supporters')
  async getUniqueSupportersByChannel(
    @Param('channelId') channelId: string,
    @Query() dto: GetHyperChats
  ) {
    const count = await this.hyperChatsService.countDistinctUsers({
      where: {
        channelId: new ChannelId(channelId),
        group: dto.toGroup(),
        gender: dto.toGender()
      }
    })

    return { count }
  }

  /**
   * 自分が送信したHyperChat一覧を取得
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyHyperChats(
    @Req() req: { user: User },
    @Query() dto: GetHyperChats
  ) {
    const hyperChats = await this.hyperChatsService.findAll({
      where: {
        userId: req.user.id
      },
      orderBy: dto.toOrderBy() ?? [{ createdAt: 'desc' }],
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })

    return hyperChats
  }
}
