import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import { ChatEventsBundleQueuesService } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.service'
import { StreamsService } from '@app/streams/streams.service'
import { Streams, StreamStatus } from '@domain/stream'
import { VideoId } from '@domain/youtube'

@Injectable()
export class MainService {
  private readonly logger = new Logger(MainService.name)

  constructor(
    private readonly streamsService: StreamsService,
    private readonly chatEventsBundleQueuesService: ChatEventsBundleQueuesService
  ) {}

  /** live中（リアルタイム） */
  async fetchLives({
    limit,
    offset
  }: {
    limit?: number
    offset?: number
  }): Promise<Streams> {
    return await this.streamsService.findAll({
      where: { status: new StreamStatus('live') },
      orderBy: [{ actualStartTime: 'asc' }],
      limit,
      offset
    })
  }

  /**
   * queue
   * チャットは終了後2分間まで取得しているので、
   * ここでは+1分して、3分以上経っているものを取得
   */
  async fetchQueues() {
    return await this.chatEventsBundleQueuesService.findAll({
      where: { createdAt: { lte: dayjs().subtract(3, 'minute').toDate() } },
      limit: 100
    })
  }

  findStream({ streams, videoId }: { streams: Streams; videoId: VideoId }) {
    const stream = streams.find(s => s.videoId.equals(videoId))
    if (!stream) {
      this.logger.log(`stream not found for ${videoId.get()}`)
      return undefined
    }
    const {
      streamTimes: { actualStartTime, actualEndTime },
      snippet: { channelId },
      group
    } = stream
    // スケジュールされたまま配信せずendedになるとここに入ってくるが、
    // 配信してないのでスパチャも存在しないとみなし、レコード作らない
    if (!actualStartTime) {
      this.logger.log(`actualStartTime not found for ${videoId.get()}, skip`)
      return undefined
    }
    return {
      actualStartTime,
      actualEndTime,
      channelId,
      group
    }
  }
}
