import { Inject, Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import {
  ChatCount,
  ChatCountRepository,
  ChatCounts
} from '@domain/stream-stats'
import { VideoId } from '@domain/youtube'

@Injectable()
export class ChatCountsService {
  private readonly logger = new Logger(ChatCountsService.name)

  constructor(
    @Inject('ChatCountRepository')
    private readonly chatCountRepository: ChatCountRepository
  ) {}

  async findAll(
    args: Parameters<ChatCountRepository['findAll']>[0]
  ): Promise<ChatCounts> {
    return await this.chatCountRepository.findAll(args)
  }

  async findOne(args: Parameters<ChatCountRepository['findOne']>[0]) {
    return await this.chatCountRepository.findOne(args)
  }

  async findLatest(
    args: Parameters<ChatCountRepository['findOne']>[0]
  ): Promise<ChatCount | null> {
    return await this.chatCountRepository.findOne({
      where: args.where,
      orderBy: [{ createdAt: 'desc' }]
    })
  }

  async save(args: Parameters<ChatCountRepository['save']>[0]): Promise<void> {
    await this.chatCountRepository.save(args)
  }

  /**
   * 配信時間が長いと大量にレコードがあるので分割しながら処理する
   */
  async bundle(args: { where: { videoId: VideoId } }): Promise<void> {
    const videoId = args.where.videoId
    const oldest = await this.chatCountRepository.findOne({
      where: args.where,
      orderBy: [{ createdAt: 'asc' }]
    })
    const latest = await this.chatCountRepository.findOne({
      where: args.where,
      orderBy: [{ createdAt: 'desc' }]
    })
    if (!oldest || !latest) return

    // 開始日時と終了日時を dayjs に変換し、秒を 0 に固定
    let current = dayjs(oldest.createdAt).second(0) // 秒を 0 にセット
    const end = dayjs(latest.createdAt)

    while (current.isBefore(end)) {
      const next = current.add(1, 'hour')

      this.logger.log(
        `${videoId.get()} Querying range: ${current.toISOString()} - ${next.toISOString()}`
      )

      const rows = (
        await this.chatCountRepository.findAllRaw({
          where: {
            videoId,
            createdAt: {
              gte: current.toDate(),
              lt: next.toDate()
            }
          },
          orderBy: [{ createdAt: 'asc' }]
        })
      ).bundle()

      // バンドルデータを保存
      await this.chatCountRepository.bundle({
        where: {
          videoId,
          createdAt: {
            gte: current.toDate(),
            lt: next.toDate()
          }
        },
        data: rows
      })

      this.logger.log(
        `${videoId.get()} Rows from ${current.format('HH:mm')} to ${next.format('HH:mm')}:`,
        rows
      )

      // 次の時間に進む
      current = next
    }

    this.logger.log(`${videoId.get()} All queries completed.`)
  }
}
