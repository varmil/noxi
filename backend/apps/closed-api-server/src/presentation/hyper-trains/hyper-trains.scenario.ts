import { Injectable } from '@nestjs/common'
import { HyperTrainsService } from '@app/hyper-trains/hyper-trains.service'
import { GroupId } from '@domain/group'
import { HyperTrain, HyperTrains, TRAIN_TRIGGER_WINDOW_MINUTES } from '@domain/hyper-train'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperTrainsScenario {
  constructor(private readonly hyperTrainsService: HyperTrainsService) {}

  /**
   * アクティブなトレイン一覧（グループでフィルタ可能）
   */
  async getActive(group?: GroupId): Promise<HyperTrains> {
    const now = new Date()
    return await this.hyperTrainsService.findAll({
      where: {
        group,
        expiresAt: { gt: now }
      },
      orderBy: [{ totalPoint: 'desc' }]
    })
  }

  /**
   * チャンネルのアクティブなトレインを取得
   */
  async getActiveByChannel(channelId: ChannelId): Promise<HyperTrain | null> {
    const now = new Date()
    return await this.hyperTrainsService.findOne({
      where: {
        channelId,
        expiresAt: { gt: now }
      }
    })
  }

  /**
   * チャンネルのベストレコードを取得
   */
  async getBestByChannel(channelId: ChannelId): Promise<HyperTrain | null> {
    return await this.hyperTrainsService.findBestByChannelId(channelId)
  }

  /**
   * チャンネルの Incoming 状態を取得
   */
  async getIncomingStatus(
    channelId: ChannelId
  ): Promise<{ uniqueUserCount: number; cooldownEndsAt: string | null }> {
    const [count, cooldownEndsAt] = await Promise.all([
      this.hyperTrainsService.countRecentUniqueUsers(
        channelId,
        TRAIN_TRIGGER_WINDOW_MINUTES
      ),
      this.hyperTrainsService.getCooldownEndsAt(channelId)
    ])
    return {
      uniqueUserCount: count,
      cooldownEndsAt: cooldownEndsAt?.toISOString() ?? null
    }
  }
}
