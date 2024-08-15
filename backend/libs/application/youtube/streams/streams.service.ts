import { Inject, Injectable } from '@nestjs/common'
import { Stream, StreamRepository, Streams } from '@domain/youtube'

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

  async findOne(
    args: Parameters<StreamRepository['findOne']>[0]
  ): Promise<Stream | null> {
    return await this.streamRepository.findOne(args)
  }

  async save(args: Parameters<StreamRepository['save']>[0]): Promise<void> {
    await this.streamRepository.save(args)
  }

  async delete(args: Parameters<StreamRepository['delete']>[0]): Promise<void> {
    await this.streamRepository.delete(args)
  }

  async end(
    args: Parameters<StreamRepository['updateStreamTimes']>[0]
  ): Promise<void> {
    await this.streamRepository.updateStreamTimes(args)
  }
}