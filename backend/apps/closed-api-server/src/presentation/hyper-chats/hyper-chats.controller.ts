import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { CreateHyperChatPaymentIntent } from '@presentation/hyper-chats/dto/CreateHyperChatPaymentIntent.dto'
import { GetHyperChats } from '@presentation/hyper-chats/dto/GetHyperChats.dto'
import { GetLikedHyperChatIds } from '@presentation/hyper-chats/dto/GetLikedHyperChatIds.dto'
import { GetRecentHyperChats } from '@presentation/hyper-chats/dto/GetRecentHyperChats.dto'
import { HyperChatsScenario } from '@presentation/hyper-chats/hyper-chats.scenario'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { HyperChatLikesService } from '@app/hyper-chat-likes/hyper-chat-likes.service'
import { HyperChatsService } from '@app/hyper-chats/hyper-chats.service'
import { HyperChatId } from '@domain/hyper-chat'
import { User } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Controller('hyper-chats')
export class HyperChatsController {
  constructor(
    private readonly hyperChatsService: HyperChatsService,
    private readonly hyperChatLikesService: HyperChatLikesService,
    private readonly hyperChatsScenario: HyperChatsScenario
  ) {}

  /**
   * チャンネルごとに最新1件のHyperChatを取得（チャンネル重複なし）
   */
  @Get('latest')
  async getLatest(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    return await this.hyperChatsService.findLatestPerChannel({
      limit: limit ?? 20
    })
  }

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
    if (!req.user.email) {
      throw new HttpException(
        'User email is required for payment',
        HttpStatus.BAD_REQUEST
      )
    }

    try {
      const result = await this.hyperChatsScenario.createPaymentIntent({
        userId: req.user.id,
        email: req.user.email,
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        tier: dto.toTier(),
        message: dto.toMessage(),
        isAnonymous: dto.toIsAnonymous()
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
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
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
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
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
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
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
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
      }
    })

    return { count }
  }

  /**
   * 全チャンネルのHyperChat一覧を取得（確定済みのみ）
   */
  @Get()
  async findAll(@Query() dto: GetHyperChats) {
    return await this.hyperChatsService.findAll({
      where: {
        group: dto.toGroup(),
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
      },
      orderBy: dto.toOrderBy() ?? [{ createdAt: 'desc' }],
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  /**
   * 全チャンネルのHyperChat件数を取得
   */
  @Get('count')
  async count(@Query() dto: GetHyperChats) {
    const count = await this.hyperChatsService.count({
      where: {
        group: dto.toGroup(),
        gender: dto.toGender(),
        createdAt: dto.toCreatedAt()
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

  /**
   * いいね済みのHyperChat IDを一括取得
   */
  @Get('liked-ids')
  @UseGuards(JwtAuthGuard)
  async getLikedIds(
    @Req() req: { user: User },
    @Query() dto: GetLikedHyperChatIds
  ) {
    const likedIds = await this.hyperChatLikesService.findLikedHyperChatIds({
      hyperChatIds: dto.toHyperChatIds(),
      userId: req.user.id
    })

    return { likedIds: Array.from(likedIds).map(id => id.get()) }
  }

  /**
   * HyperChatにいいねを追加
   */
  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async addLike(
    @Req() req: { user: User },
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.hyperChatLikesService.create({
      hyperChatId: new HyperChatId(id),
      userId: req.user.id
    })

    return { success: true }
  }

  /**
   * HyperChatのいいねを解除
   */
  @Delete(':id/like')
  @UseGuards(JwtAuthGuard)
  async removeLike(
    @Req() req: { user: User },
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.hyperChatLikesService.delete({
      hyperChatId: new HyperChatId(id),
      userId: req.user.id
    })

    return { success: true }
  }
}
