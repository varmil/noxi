import { Module } from '@nestjs/common'
import { ExchangeRatesService } from '@app/exchange-rates/exchange-rates.service'
import { ExchangeRateInfraModule } from '@infra/exchange-rate/exchange-rate.infra.module'

@Module({
  imports: [ExchangeRateInfraModule],
  providers: [ExchangeRatesService],
  exports: [ExchangeRateInfraModule, ExchangeRatesService]
})
export class ExchangeRatesAppModule {}
