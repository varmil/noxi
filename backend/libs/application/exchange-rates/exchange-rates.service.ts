import { Inject, Injectable } from '@nestjs/common'
import { ExchangeRateRepository } from '@domain/exchange-rate'

@Injectable()
export class ExchangeRatesService {
  constructor(
    @Inject('ExchangeRateRepository')
    private readonly exchangeRateRepository: ExchangeRateRepository
  ) {}

  async findAll() {
    return this.exchangeRateRepository.findAll()
  }
}
