import { Module } from '@nestjs/common'
import { ExchangeRateRepositoryImpl } from '@infra/exchange-rate/ExchangeRate.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ExchangeRateRepositoryImpl,
    {
      provide: 'ExchangeRateRepository',
      useClass: ExchangeRateRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ExchangeRateRepositoryImpl,
    {
      provide: 'ExchangeRateRepository',
      useClass: ExchangeRateRepositoryImpl
    }
  ]
})
export class ExchangeRateInfraModule {}
