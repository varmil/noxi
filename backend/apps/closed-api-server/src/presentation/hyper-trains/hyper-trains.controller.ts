import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { GetHyperTrains } from '@presentation/hyper-trains/dto/GetHyperTrains.dto'
import { HyperTrainsScenario } from '@presentation/hyper-trains/hyper-trains.scenario'
import { UserId } from '@domain/user'
import { ChannelId } from '@domain/youtube'

@Controller('hyper-trains')
export class HyperTrainsController {
  constructor(private readonly hyperTrainsScenario: HyperTrainsScenario) {}

  /**
   * アクティブなトレイン一覧（グループでフィルタ可能）
   */
  @Get('active')
  async getActive(@Query() dto: GetHyperTrains) {
    return await this.hyperTrainsScenario.getActive(dto.toGroup())
  }

  /**
   * チャンネルのアクティブなトレインを取得
   */
  @Get('channels/:channelId/active')
  async getActiveByChannel(@Param('channelId') channelId: string) {
    return await this.hyperTrainsScenario.getActiveByChannel(
      new ChannelId(channelId)
    )
  }

  /**
   * チャンネルのベストレコードを取得
   */
  @Get('channels/:channelId/best')
  async getBestByChannel(@Param('channelId') channelId: string) {
    return await this.hyperTrainsScenario.getBestByChannel(
      new ChannelId(channelId)
    )
  }

  /**
   * チャンネルの Incoming 状態（ユニークユーザー数）を取得
   */
  @Get('channels/:channelId/incoming')
  async getIncomingStatus(@Param('channelId') channelId: string) {
    return await this.hyperTrainsScenario.getIncomingStatus(
      new ChannelId(channelId)
    )
  }

  /**
   * ユーザーのハイパートレイン貢献統計を取得
   */
  @Get('contributions/users/:userId/stats')
  async getUserContributionStats(
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return await this.hyperTrainsScenario.getUserContributionStats(
      new UserId(userId)
    )
  }
}
