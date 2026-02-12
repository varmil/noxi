import { Inject, Injectable, Logger } from '@nestjs/common'
import { HyperChatRepository } from '@domain/hyper-chat'

@Injectable()
export class HyperChatsService {
  private readonly logger = new Logger(HyperChatsService.name)

  constructor(
    @Inject('HyperChatRepository')
    private readonly hyperChatRepository: HyperChatRepository
  ) {}

  async create(args: Parameters<HyperChatRepository['create']>[0]) {
    return await this.hyperChatRepository.create(args)
  }

  async findById(args: Parameters<HyperChatRepository['findById']>[0]) {
    return await this.hyperChatRepository.findById(args)
  }

  async findByOrderId(
    args: Parameters<HyperChatRepository['findByOrderId']>[0]
  ) {
    return await this.hyperChatRepository.findByOrderId(args)
  }

  async findAll(args: Parameters<HyperChatRepository['findAll']>[0]) {
    return await this.hyperChatRepository.findAll(args)
  }

  async count(args: Parameters<HyperChatRepository['count']>[0]) {
    return await this.hyperChatRepository.count(args)
  }

  async sumAmount(args: Parameters<HyperChatRepository['sumAmount']>[0]) {
    return await this.hyperChatRepository.sumAmount(args)
  }

  async countDistinctUsers(
    args: Parameters<HyperChatRepository['countDistinctUsers']>[0]
  ) {
    return await this.hyperChatRepository.countDistinctUsers(args)
  }

  async findLatestPerChannel(
    args: Parameters<HyperChatRepository['findLatestPerChannel']>[0]
  ) {
    return await this.hyperChatRepository.findLatestPerChannel(args)
  }

  async findRecentByChannelIds(
    args: Parameters<HyperChatRepository['findRecentByChannelIds']>[0]
  ) {
    return await this.hyperChatRepository.findRecentByChannelIds(args)
  }

  /**
   * Next.js のキャッシュを無効化
   * Vercel Bot Protection 対策:
   * - 秘密トークンで認証
   * - 適切な User-Agent を設定
   */
  async revalidateCache(channelId: string): Promise<void> {
    const webUrl = process.env.WEB_URL
    const secret = process.env.REVALIDATE_SECRET

    if (!webUrl || !secret) {
      this.logger.warn('WEB_URL or REVALIDATE_SECRET not set')
      return
    }

    try {
      const response = await fetch(`${webUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-secret': secret,
          // Vercel Bot Protection 対策: 正規のUser-Agentを設定
          'User-Agent': 'NoxiBackend/1.0 (Revalidation Service)'
        },
        body: JSON.stringify({
          tags: [
            `hyper-chat:${channelId}`,
            'hyper-trains-active',
            'hyper-chats-latest'
          ]
        })
      })

      if (!response.ok) {
        this.logger.error(
          `Failed to revalidate cache: ${response.status} ${response.statusText}`
        )
      } else {
        this.logger.log(`Revalidated cache for channel: ${channelId}`)
      }
    } catch (error) {
      this.logger.error('Error calling revalidate endpoint', error)
    }
  }
}
