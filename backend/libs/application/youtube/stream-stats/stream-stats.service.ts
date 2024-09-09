import { Inject, Injectable } from '@nestjs/common'
import {
  StreamStatsRepository,
  ViewerCounts,
  ChatCounts,
  ChatCount,
  AvgCount
} from '@domain/youtube'

@Injectable()
export class StreamStatsService {
  constructor(
    @Inject('StreamStatsRepository')
    private readonly streamStatsRepository: StreamStatsRepository
  ) {}

  async findAllViewerCounts(
    args: Parameters<StreamStatsRepository['findAllViewerCounts']>[0]
  ): Promise<ViewerCounts> {
    return await this.streamStatsRepository.findAllViewerCounts(args)
  }

  async findAvgViewerCount(
    args: Parameters<StreamStatsRepository['findAvgViewerCount']>[0]
  ): Promise<AvgCount> {
    return await this.streamStatsRepository.findAvgViewerCount(args)
  }

  async findAllChatCounts(
    args: Parameters<StreamStatsRepository['findAllChatCounts']>[0]
  ): Promise<ChatCounts> {
    return await this.streamStatsRepository.findAllChatCounts(args)
  }

  async findLatestChatCount(
    args: Parameters<StreamStatsRepository['findLatestChatCount']>[0]
  ): Promise<ChatCount | null> {
    return await this.streamStatsRepository.findLatestChatCount(args)
  }

  async saveViewerCount(
    args: Parameters<StreamStatsRepository['saveViewerCount']>[0]
  ): Promise<void> {
    await this.streamStatsRepository.saveViewerCount(args)
  }

  // ここでInfraサービスから「総数」を取って、
  // 「差分」に変換してもいいかもしれない
  async saveChatCount(
    args: Parameters<StreamStatsRepository['saveChatCount']>[0]
  ): Promise<void> {
    await this.streamStatsRepository.saveChatCount(args)
  }
}
