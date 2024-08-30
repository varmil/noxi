import { Injectable } from '@nestjs/common'
import { CountryCode } from '@domain/country'
import { Countries, CountryRepository } from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class CountryRepositoryImpl implements CountryRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll() {
    const rows = await this.prismaInfraService.channel.findMany({
      where: {},
      distinct: ['country'],
      select: { country: true }
    })

    return new Countries(rows.map(e => new CountryCode(e.country)))
  }
}
