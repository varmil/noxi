import { Injectable } from '@nestjs/common'
import { Email, User, UserId, UserRepository } from '@domain/user'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findById: UserRepository['findById'] = async userId => {
    const row = await this.prismaInfraService.user.findUnique({
      where: { id: userId.get() }
    })
    if (!row) return null
    return new User({
      id: new UserId(row.id),
      email: row.email ? new Email(row.email) : undefined
    })
  }

  deleteById: UserRepository['deleteById'] = async userId => {
    await this.prismaInfraService.user.delete({
      where: { id: userId.get() }
    })
  }
}
