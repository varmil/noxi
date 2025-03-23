import { Inject, Injectable } from '@nestjs/common'
import { MembershipRepository, Memberships } from '@domain/membership'

@Injectable()
export class MembershipsService {
  constructor(
    @Inject('MembershipRepository')
    private readonly membershipRepository: MembershipRepository
  ) {}

  async findAll(
    args: Parameters<MembershipRepository['findAll']>[0]
  ): Promise<Memberships> {
    return await this.membershipRepository.findAll(args)
  }

  async count(
    args: Parameters<MembershipRepository['count']>[0]
  ): Promise<number> {
    return await this.membershipRepository.count(args)
  }

  async save(args: Parameters<MembershipRepository['save']>[0]): Promise<void> {
    await this.membershipRepository.save(args)
  }
}
