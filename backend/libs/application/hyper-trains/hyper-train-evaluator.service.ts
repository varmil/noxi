import { Injectable, Logger } from '@nestjs/common'
import { HyperChatsService } from '@app/hyper-chats/hyper-chats.service'
import { HyperTrainsService } from '@app/hyper-trains/hyper-trains.service'
import { HyperChat } from '@domain/hyper-chat'
import {
  calculateLevel,
  Level,
  Point,
  TotalPoint,
  TRAIN_COOLDOWN_HOURS,
  TRAIN_DURATION_MINUTES,
  TRAIN_MAX_DURATION_HOURS,
  TRAIN_TRIGGER_UNIQUE_USERS,
  TRAIN_TRIGGER_WINDOW_MINUTES,
  HyperTrain
} from '@domain/hyper-train'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperTrainEvaluatorService {
  private readonly logger = new Logger(HyperTrainEvaluatorService.name)

  constructor(
    private readonly hyperTrainsService: HyperTrainsService,
    private readonly hyperChatsService: HyperChatsService
  ) {}

  /**
   * HyperChat が作成された後にトレインを評価する
   * - アクティブなトレインがあれば貢献を追加
   * - なければ新規トレイン発動を判定
   */
  async evaluate(hyperChat: HyperChat): Promise<void> {
    const now = new Date()
    const channelId = hyperChat.channelId

    // 1. アクティブなトレインがあるか確認（expiresAt > now で判定）
    const activeTrain = await this.hyperTrainsService.findOne({
      where: {
        channelId,
        expiresAt: { gt: now }
      }
    })

    if (activeTrain) {
      // 2a. アクティブなトレインに貢献を追加
      await this.contributeToTrain(activeTrain, hyperChat)
    } else {
      // 2b. クールダウン中でなければ新規トレイン評価
      const isInCooldown = await this.isInCooldown(channelId, now)
      if (!isInCooldown) {
        await this.evaluateNewTrain(hyperChat, now)
      }
    }
  }

  /**
   * アクティブなトレインに貢献を追加し、レベルアップを処理
   */
  private async contributeToTrain(
    train: HyperTrain,
    hyperChat: HyperChat
  ): Promise<void> {
    const point = hyperChat.getPoint()

    // 貢献を追加
    await this.hyperTrainsService.addContribution({
      data: {
        hyperTrainId: train.id,
        hyperChatId: hyperChat.id,
        userId: hyperChat.userId,
        point: new Point(point)
      }
    })

    // 新しい合計ポイントとレベルを計算
    const newTotalPoint = train.totalPoint.get() + point
    const newLevel = calculateLevel(newTotalPoint)
    const oldLevel = train.level.get()

    // レベルアップ時はタイマーリセット（最大6時間制限内）
    let newExpiresAt: Date | undefined
    if (newLevel > oldLevel) {
      const maxExpiresAt = new Date(
        train.startedAt.getTime() + TRAIN_MAX_DURATION_HOURS * 60 * 60 * 1000
      )
      const resetExpiresAt = new Date(
        Date.now() + TRAIN_DURATION_MINUTES * 60 * 1000
      )
      // 最大6時間を超えないようにする
      newExpiresAt =
        resetExpiresAt.getTime() > maxExpiresAt.getTime()
          ? maxExpiresAt
          : resetExpiresAt

      this.logger.log(
        `Train ${train.id.get()} leveled up: ${oldLevel} → ${newLevel}`
      )
    }

    // トレインを更新
    await this.hyperTrainsService.update({
      id: train.id,
      data: {
        level: new Level(newLevel),
        totalPoint: new TotalPoint(newTotalPoint),
        expiresAt: newExpiresAt
      }
    })
  }

  /**
   * 新規トレインの発動を評価
   * - Max tier → ソロスタート
   * - それ以外 → 過去60分の3人ユニークユーザー判定
   */
  private async evaluateNewTrain(
    hyperChat: HyperChat,
    now: Date
  ): Promise<void> {
    const channelId = hyperChat.channelId
    const isSoloStart = hyperChat.tier.get() === 'max'

    if (!isSoloStart) {
      // ユニークユーザー数を確認
      const uniqueUsers = await this.hyperTrainsService.countRecentUniqueUsers(
        channelId,
        TRAIN_TRIGGER_WINDOW_MINUTES
      )

      if (uniqueUsers < TRAIN_TRIGGER_UNIQUE_USERS) {
        return // 条件未達
      }
    }

    // 過去60分の全 HyperChat を収集して初期 contributions に
    const since = new Date(
      now.getTime() - TRAIN_TRIGGER_WINDOW_MINUTES * 60 * 1000
    )
    const recentChats = await this.hyperChatsService.findAll({
      where: {
        channelId,
        createdAt: { gte: since }
      },
      orderBy: [{ createdAt: 'asc' }],
      limit: 1000
    })

    // 初期ポイント計算
    let initialTotalPoint = 0
    for (const chat of recentChats) {
      initialTotalPoint += chat.getPoint()
    }

    const initialLevel = calculateLevel(initialTotalPoint)
    const expiresAt = new Date(
      now.getTime() + TRAIN_DURATION_MINUTES * 60 * 1000
    )

    // トレインを作成
    const trainId = await this.hyperTrainsService.create({
      data: {
        channelId,
        group: hyperChat.group,
        level: new Level(initialLevel),
        totalPoint: new TotalPoint(initialTotalPoint),
        startedAt: now,
        expiresAt
      }
    })

    // 過去の HyperChat を初期 contributions として追加
    for (const chat of recentChats) {
      await this.hyperTrainsService.addContribution({
        data: {
          hyperTrainId: trainId,
          hyperChatId: chat.id,
          userId: chat.userId,
          point: new Point(chat.getPoint())
        }
      })
    }

    this.logger.log(
      `Train started for channel ${channelId.get()}: Level ${initialLevel}, ${initialTotalPoint}pt, ${recentChats.length} contributions`
    )
  }

  /**
   * クールダウン中かどうかを判定
   * expiresAt から1時間以内はクールダウン
   */
  private async isInCooldown(
    channelId: ChannelId,
    now: Date
  ): Promise<boolean> {
    const cooldownSince = new Date(
      now.getTime() - TRAIN_COOLDOWN_HOURS * 60 * 60 * 1000
    )

    // expiresAt が (now - 1h) 〜 now の範囲にあるトレイン = クールダウン圏内
    const recentlyExpired = await this.hyperTrainsService.findAll({
      where: {
        channelId,
        expiresAt: { gt: cooldownSince }
      },
      orderBy: [{ startedAt: 'desc' }],
      limit: 1
    })

    for (const train of recentlyExpired) {
      if (train.expiresAt.getTime() < now.getTime()) {
        return true
      }
    }

    return false
  }
}
