import { Injectable } from '@nestjs/common'
import {
  ExchangeRate,
  ExchangeRateRepository,
  ExchangeRates,
  Rate
} from '@domain/exchange-rate'
import { Currency } from '@domain/lib/currency'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ExchangeRateRepositoryImpl implements ExchangeRateRepository {
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  async findAll() {
    const rows = await this.prismaInfraService.exchangeRate.findMany()
    return new ExchangeRates(
      rows.map(
        e =>
          new ExchangeRate({
            currency: new Currency(e.currency),
            rate: new Rate(e.rate)
          })
      )
    )
  }
}
