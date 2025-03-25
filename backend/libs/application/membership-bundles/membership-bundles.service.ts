import { Inject, Injectable } from '@nestjs/common'
import { MembershipBundleRepository } from '@domain/membership-bundle'

@Injectable()
export class MembershipBundlesService {
  constructor(
    @Inject('MembershipBundleRepository')
    private readonly membershipBundleRepository: MembershipBundleRepository
  ) {}

  async findAll(args: Parameters<MembershipBundleRepository['findAll']>[0]) {
    return await this.membershipBundleRepository.findAll(args)
  }

  async findOne(args: Parameters<MembershipBundleRepository['findOne']>[0]) {
    return await this.membershipBundleRepository.findOne(args)
  }

  async save(args: Parameters<MembershipBundleRepository['save']>[0]) {
    await this.membershipBundleRepository.save(args)
  }

  async sum(args: Parameters<MembershipBundleRepository['sum']>[0]) {
    return await this.membershipBundleRepository.sum(args)
  }
}
