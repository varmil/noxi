import { Injectable } from '@nestjs/common'
import axios from 'axios'
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

  async update() {
    const exchangeRates = await this.fetchExchangeRates()
    const promises = Object.keys(exchangeRates).map(async currency => {
      await this.prismaInfraService.exchangeRate.upsert({
        where: { currency },
        update: { rate: exchangeRates[currency] },
        create: { currency, rate: exchangeRates[currency] }
      })
    })
    await Promise.all(promises)
  }

  private fetchExchangeRates = async () => {
    const response = await axios.get<{
      conversion_rates: Record<string, number>
    }>(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/JPY`
    )
    return response.data.conversion_rates
  }
}
