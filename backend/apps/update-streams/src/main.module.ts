import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainService } from 'apps/update-streams/src/main.service'
import { EndScheduledLivesScenario } from 'apps/update-streams/src/scenario/end-scheduled-lives.scenario'
import { MainScenario } from 'apps/update-streams/src/scenario/main.scenario'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'
import { StreamsModule } from '@app/streams/stream.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    YoutubeAppModule,
    StreamsModule,
    StreamStatsModule,
    YoutubeInfraModule
  ],
  controllers: [],
  providers: [MainScenario, EndScheduledLivesScenario, MainService]
})
export class MainModule {}
