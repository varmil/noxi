import { Injectable } from '@nestjs/common'
import { ExchangeRatesService } from '@app/exchange-rates/exchange-rates.service'

@Injectable()
export class MainScenario {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  async execute(): Promise<void> {
    await this.exchangeRatesService.update()
  }
}
