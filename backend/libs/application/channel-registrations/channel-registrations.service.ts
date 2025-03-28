import { Inject, Injectable } from '@nestjs/common'
import {
  ChannelRegistration,
  ChannelRegistrationRepository
} from '@domain/channel-registration'

@Injectable()
export class ChannelRegistrationsService {
  constructor(
    @Inject('ChannelRegistrationRepository')
    private readonly channelRegistrationRepository: ChannelRegistrationRepository
  ) {}

  async findAll() {
    return await this.channelRegistrationRepository.findAll()
  }

  async save(args: ChannelRegistration) {
    await this.channelRegistrationRepository.save(args)
  }
}
