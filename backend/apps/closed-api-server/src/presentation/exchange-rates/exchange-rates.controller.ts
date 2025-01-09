import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors
} from '@nestjs/common'
import { ExchangeRatesService } from '@app/exchange-rates/exchange-rates.service'

@Controller('exchange-rates')
@UseInterceptors(ClassSerializerInterceptor)
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  async getExchangeRates() {
    return await this.exchangeRatesService.findAll()
  }
}
