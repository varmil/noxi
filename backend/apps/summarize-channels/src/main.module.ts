import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateMembershipSummariesService } from 'apps/summarize-channels/src/service/create-membership-summaries.service'
import { LibAppModule } from '@app/lib/lib.app.module'
import { MembershipBundlesAppModule } from '@app/membership-bundles/membership-bundles.module'
import { MembershipSummariesAppModule } from '@app/membership-summaries/membership-summaries.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { SupersRankingsAppModule } from '@app/supers-rankings/supers-rankings.module'
import { SupersSummariesAppModule } from '@app/supers-summaries/supers-summaries.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { MainScenario } from './scenario/main.scenario'
import { CreateSupersSummariesService } from './service/create-supers-summaries.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    MembershipBundlesAppModule,
    MembershipSummariesAppModule,
    SupersBundlesAppModule,
    SupersRankingsAppModule,
    SupersSummariesAppModule,
    YoutubeAppModule
  ],
  controllers: [],
  providers: [
    MainScenario,
    CreateMembershipSummariesService,
    CreateSupersSummariesService
  ]
})
export class MainModule {}
