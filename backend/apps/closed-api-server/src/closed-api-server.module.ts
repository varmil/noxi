import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CloudSchedulersPresentationModule } from '@presentation/cloud-schedulers/cloud-schedulers.presentation.module'
import { ExchangeRatesPresentationModule } from '@presentation/exchange-rates/exchange-rates.presentation.module'
import { GroupsPresentationModule } from '@presentation/group/groups.presentation.module'
import { HealthController } from '@presentation/health/health.controller'
import { SupersPresentationModule } from '@presentation/supers/supers.presentation.module'
import { SupersBundlesPresentationModule } from '@presentation/supers-bundles/supers-bundles.presentation.module'
import { SupersRankingsPresentationModule } from '@presentation/supers-rankings/supers-rankings.presentation.module'
import { SupersSummariesPresentationModule } from '@presentation/supers-summaries/supers-summaries.presentation.module'
import { XPresentationModule } from '@presentation/x/x.presentation.module'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'
import { LibAppModule } from '@app/lib/lib.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    CacheModule.register({ isGlobal: true }),
    LibAppModule,
    CloudSchedulersPresentationModule,
    ExchangeRatesPresentationModule,
    GroupsPresentationModule,
    SupersPresentationModule,
    SupersBundlesPresentationModule,
    SupersRankingsPresentationModule,
    SupersSummariesPresentationModule,
    YoutubePresentationModule,
    XPresentationModule
  ],
  controllers: [HealthController],
  providers: []
})
export class ClosedApiServerModule {}
