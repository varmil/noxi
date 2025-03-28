import { Inject, Injectable } from '@nestjs/common'
import {
  ChannelRegistration,
  ChannelRegistrationRepository
} from '@domain/channel-registration'
import { ChannelId } from '@domain/youtube'

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

  async save(args: ChannelRegistration) {
    await this.channelRegistrationRepository.save(args)
  }
}
