import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { SupersSummariesAppModule } from '@app/supers-summaries/supers-summaries.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { MainScenario } from './scenario/main.scenario'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    GroupsAppModule,
    SupersBundlesAppModule,
    SupersSummariesAppModule,
    YoutubeAppModule
  ],
  controllers: [],
  providers: [MainScenario]
})
export class MainModule {}
