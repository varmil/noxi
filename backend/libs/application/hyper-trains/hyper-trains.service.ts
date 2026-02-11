import { Inject, Injectable } from '@nestjs/common'
import { HyperTrainRepository, TRAIN_COOLDOWN_HOURS } from '@domain/hyper-train'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class HyperTrainsService {
  constructor(
    @Inject('HyperTrainRepository')
    private readonly hyperTrainRepository: HyperTrainRepository
  ) {}

  async findOne(args: Parameters<HyperTrainRepository['findOne']>[0]) {
    return await this.hyperTrainRepository.findOne(args)
  }

  async findAll(args: Parameters<HyperTrainRepository['findAll']>[0]) {
    return await this.hyperTrainRepository.findAll(args)
  }

  async findBestByChannelId(
    args: Parameters<HyperTrainRepository['findBestByChannelId']>[0]
  ) {
    return await this.hyperTrainRepository.findBestByChannelId(args)
  }

  async countRecentUniqueUsers(
    ...args: Parameters<HyperTrainRepository['countRecentUniqueUsers']>
  ) {
    return await this.hyperTrainRepository.countRecentUniqueUsers(...args)
  }

  /**
   * クールダウン終了時刻を返す。クールダウン中でなければ null
   */
  async getCooldownEndsAt(channelId: ChannelId): Promise<Date | null> {
    const now = new Date()
    const trains = await this.hyperTrainRepository.findAll({
      where: {
        channelId,
        expiresAt: {
          gt: new Date(now.getTime() - TRAIN_COOLDOWN_HOURS * 60 * 60 * 1000)
        }
      },
      orderBy: [{ startedAt: 'desc' }],
      limit: 1
    })

    for (const train of trains) {
      // expiresAt が過去 = 終了済み
      if (train.expiresAt.getTime() < now.getTime()) {
        const cooldownEndsAt = new Date(
          train.expiresAt.getTime() + TRAIN_COOLDOWN_HOURS * 60 * 60 * 1000
        )
        return cooldownEndsAt
      }
    }

    return null
  }

  async create(args: Parameters<HyperTrainRepository['create']>[0]) {
    return await this.hyperTrainRepository.create(args)
  }

  async addContribution(
    args: Parameters<HyperTrainRepository['addContribution']>[0]
  ) {
    return await this.hyperTrainRepository.addContribution(args)
  }

  async update(args: Parameters<HyperTrainRepository['update']>[0]) {
    return await this.hyperTrainRepository.update(args)
  }
}
