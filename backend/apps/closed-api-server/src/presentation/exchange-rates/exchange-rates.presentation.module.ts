import { Module } from '@nestjs/common'
import { ExchangeRatesAppModule } from '@app/exchange-rates/exchange-rates.app.module'
import { ExchangeRatesController } from '@presentation/exchange-rates/exchange-rates.controller'

@Module({
  imports: [ExchangeRatesAppModule],
  controllers: [ExchangeRatesController],
  providers: []
})
export class ExchangeRatesPresentationModule {}
