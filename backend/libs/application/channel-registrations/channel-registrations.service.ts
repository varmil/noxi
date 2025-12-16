import { Inject, Injectable } from '@nestjs/common'
import { ChannelRegistrationRepository, Status } from '@domain/channel-registration'
import { GroupId } from '@domain/group'
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

  async updateStatus(args: {
    channelId: ChannelId
    status: Status
    group?: GroupId
  }) {
    await this.channelRegistrationRepository.updateMany({
      where: { channelIds: new ChannelIds([args.channelId]) },
      data: { status: args.status, group: args.group }
    })
  }
}
