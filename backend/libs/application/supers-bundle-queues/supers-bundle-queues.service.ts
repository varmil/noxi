import { Inject, Injectable } from '@nestjs/common'
import { StreamRepository } from '@domain/stream'
import { SupersBundleQueueRepository } from '@domain/supers-bundle-queue'

@Injectable()
export class SupersBundleQueuesService {
  constructor(
    @Inject('SupersBundleQueueRepository')
    private readonly supersBundleQueueRepository: SupersBundleQueueRepository,
    @Inject('StreamRepository')
    private readonly streamRepository: StreamRepository
  ) {}

  async findAll(args: Parameters<SupersBundleQueueRepository['findAll']>[0]) {
    return await this.supersBundleQueueRepository.findAll(args)
  }

  async save(args: Parameters<SupersBundleQueueRepository['save']>[0]) {
    // 数年前のStreamが削除/更新された際もこの関数が呼ばれうるが
    // StreamがそもそもDBになければバンドルできないので
    // 保存しようとしている時点でStreamの存在をチェック
    if (
      !(await this.streamRepository.findOne({
        where: { videoId: args.where.videoId }
      }))
    ) {
      return
    }

    await this.supersBundleQueueRepository.save(args)
  }

  async delete(args: Parameters<SupersBundleQueueRepository['delete']>[0]) {
    await this.supersBundleQueueRepository.delete(args)
  }
}
