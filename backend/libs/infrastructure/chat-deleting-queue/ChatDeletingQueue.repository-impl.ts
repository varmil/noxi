import { Injectable } from '@nestjs/common'
import { ChatDeletingQueueRepository } from '@domain/chat-deleting-queue'
import { ChatDeletingQueue } from '@domain/chat-deleting-queue/ChatDeletingQueue.entity'
import { ChatDeletingQueues } from '@domain/chat-deleting-queue/ChatDeletingQueues.collection'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChatDeletingQueueRepositoryImpl
  implements ChatDeletingQueueRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll({
    where,
    limit
  }: Parameters<ChatDeletingQueueRepository['findAll']>[0]) {
    const rows = await this.prismaInfraService.streamChatDeletingQueue.findMany(
      { where, take: limit }
    )
    return new ChatDeletingQueues(
      rows.map(
        row =>
          new ChatDeletingQueue({
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
  }: Parameters<ChatDeletingQueueRepository['save']>[0]) {
    await this.prismaInfraService.streamChatDeletingQueue.upsert({
      where: { videoId: where.videoId.get() },
      update: { status: data.status.get() },
      create: { videoId: where.videoId.get(), status: data.status.get() }
    })
  }

  async delete({
    where: { videoId }
  }: Parameters<ChatDeletingQueueRepository['delete']>[0]) {
    await this.prismaInfraService.streamChatDeletingQueue.delete({
      where: { videoId: videoId.get() }
    })
  }
}
