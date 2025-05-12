import { Inject, Injectable } from '@nestjs/common'
import { UserId, UserRepository } from '@domain/user'

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) {}

  async findById(userId: UserId) {
    return await this.userRepository.findById(userId)
  }

  async deleteById(userId: UserId) {
    return await this.userRepository.deleteById(userId)
  }
}
