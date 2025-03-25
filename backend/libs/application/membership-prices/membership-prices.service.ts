import { Inject, Injectable } from '@nestjs/common'
import { MembershipPriceRepository } from '@domain/membership-price'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class MembershipPricesService {
  constructor(
    @Inject('MembershipPriceRepository')
    private readonly membershipPriceRepository: MembershipPriceRepository
  ) {}

  async findById(channelId: ChannelId) {
    return this.membershipPriceRepository.findById(channelId)
  }
}
