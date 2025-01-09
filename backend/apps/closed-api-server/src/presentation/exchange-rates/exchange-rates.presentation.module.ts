import { Module } from '@nestjs/common'
import { ExchangeRatesController } from '@presentation/exchange-rates/exchange-rates.controller'
import { ExchangeRatesAppModule } from '@app/exchange-rates/exchange-rates.app.module'

@Module({
  imports: [ExchangeRatesAppModule],
  controllers: [ExchangeRatesController],
  providers: []
})
export class ExchangeRatesPresentationModule {}
