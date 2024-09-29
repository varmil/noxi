import { Injectable } from '@nestjs/common'
import { ChatBundleQueueRepository } from '@domain/chat-bundle-queue'
import { ChatBundleQueue } from '@domain/chat-bundle-queue/ChatBundleQueue.entity'
import { ChatBundleQueues } from '@domain/chat-bundle-queue/ChatBundleQueues.collection'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChatBundleQueueRepositoryImpl
  implements ChatBundleQueueRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    limit
  }: Parameters<ChatBundleQueueRepository['findAll']>[0]) {
    const rows =
      await this.prismaInfraService.youtubeStreamChatBundleQueue.findMany({
        take: limit
      })

    return new ChatBundleQueues(
      rows.map(
        row =>
          new ChatBundleQueue({
            status: new QueueStatus(row.status),
            videoId: new VideoId(row.videoId),
            createdAt: row.createdAt
          })
      )
    )
  }

  async save({
    where,
    data
  }: Parameters<ChatBundleQueueRepository['save']>[0]) {
    await this.prismaInfraService.youtubeStreamChatBundleQueue.upsert({
      where: { videoId: where.videoId.get() },
      update: { status: data.status.get() },
      create: { videoId: where.videoId.get(), status: data.status.get() }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<ChatBundleQueueRepository['delete']>[0]) {
    await this.prismaInfraService.youtubeStreamChatBundleQueue.delete({
      where: { videoId: videoId.get() }
    })
  }
}
