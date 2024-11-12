import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainScenario } from 'apps/bundle-supers/src/scenario/main.scenario'
import { ExchangeRatesAppModule } from '@app/exchange-rates/exchange-rates.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    ExchangeRatesAppModule
  ],
  providers: [MainScenario]
})
export class MainModule {}
