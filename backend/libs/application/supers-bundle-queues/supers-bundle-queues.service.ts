import { Inject, Injectable } from '@nestjs/common'
import { SupersBundleQueueRepository } from '@domain/supers-bundle-queue'

@Injectable()
export class SupersBundleQueuesService {
  constructor(
    @Inject('SupersBundleQueueRepository')
    private readonly streamRepository: SupersBundleQueueRepository
  ) {}

  async findAll(args: Parameters<SupersBundleQueueRepository['findAll']>[0]) {
    return await this.streamRepository.findAll(args)
  }

  async save(args: Parameters<SupersBundleQueueRepository['save']>[0]) {
    await this.streamRepository.save(args)
  }

  async delete(args: Parameters<SupersBundleQueueRepository['delete']>[0]) {
    await this.streamRepository.delete(args)
  }
}
