import { Inject, Injectable } from '@nestjs/common'
import { MembershipPriceRepository } from '@domain/membership-price'

@Injectable()
export class MembershipPricesService {
  constructor(
    @Inject('MembershipPriceRepository')
    private readonly membershipPriceRepository: MembershipPriceRepository
  ) {}

  async findAll() {
    return this.membershipPriceRepository.findAll()
  }
}
