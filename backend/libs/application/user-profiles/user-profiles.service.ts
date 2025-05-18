import { Inject, Injectable } from '@nestjs/common'
import { UserProfileRepository } from '@domain/user-profile'

@Injectable()
export class UserProfilesService {
  constructor(
    @Inject('UserProfileRepository')
    private readonly userProfileRepository: UserProfileRepository
  ) {}

  async findAll(args: Parameters<UserProfileRepository['findAll']>[0]) {
    return await this.userProfileRepository.findAll(args)
  }

  async findByUsername(
    args: Parameters<UserProfileRepository['findByUsername']>[0]
  ) {
    return await this.userProfileRepository.findByUsername(args)
  }

  async findById(args: Parameters<UserProfileRepository['findById']>[0]) {
    return await this.userProfileRepository.findById(args)
  }

  async save(args: Parameters<UserProfileRepository['save']>[0]) {
    return await this.userProfileRepository.save(args)
  }
}
