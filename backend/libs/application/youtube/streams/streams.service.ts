import { Inject, Injectable } from '@nestjs/common'
import { StreamRepository, Streams } from '@domain/youtube'

@Injectable()
export class StreamsService {
  constructor(
    @Inject('StreamRepository')
    private readonly streamRepository: StreamRepository
  ) {}

  async findAll(
    args: Parameters<StreamRepository['findAll']>[0]
  ): Promise<Streams> {
    return await this.streamRepository.findAll(args)
  }

  async save(args: Parameters<StreamRepository['save']>[0]): Promise<void> {
    await this.streamRepository.save(args)
  }
}
