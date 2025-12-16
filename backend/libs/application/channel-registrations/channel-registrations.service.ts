import { Inject, Injectable } from '@nestjs/common'
import { ChannelRegistrationRepository, Status } from '@domain/channel-registration'
import { ChannelId, ChannelIds } from '@domain/youtube'

@Injectable()
export class ChannelRegistrationsService {
  constructor(
    @Inject('ChannelRegistrationRepository')
    private readonly channelRegistrationRepository: ChannelRegistrationRepository
  ) {}

  async findAll(args: Parameters<ChannelRegistrationRepository['findAll']>[0]) {
    return await this.channelRegistrationRepository.findAll(args)
  }

  async findById(channelId: ChannelId) {
    return await this.channelRegistrationRepository.findById(channelId)
  }

  async save(args: Parameters<ChannelRegistrationRepository['save']>[0]) {
    await this.channelRegistrationRepository.save(args)
  }

  async updateMany(
    args: Parameters<ChannelRegistrationRepository['updateMany']>[0]
  ) {
    await this.channelRegistrationRepository.updateMany(args)
  }

  async updateStatus(channelId: ChannelId, status: Status) {
    await this.channelRegistrationRepository.updateMany({
      where: { channelIds: new ChannelIds([channelId]) },
      data: { status }
    })
  }
}
