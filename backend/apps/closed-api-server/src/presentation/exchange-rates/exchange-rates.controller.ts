import {
  
  Controller,
  Get,
  
} from '@nestjs/common'
import { ExchangeRatesService } from '@app/exchange-rates/exchange-rates.service'

@Controller('exchange-rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  async getExchangeRates() {
    return await this.exchangeRatesService.findAll()
  }
}
