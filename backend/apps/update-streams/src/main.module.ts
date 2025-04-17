import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainService } from 'apps/update-streams/src/main.service'
import { EndLivesScenario } from 'apps/update-streams/src/scenario/end-lives.scenario'
import { HandleScheduledScenario } from 'apps/update-streams/src/scenario/handle-scheduled.scenario'
import { MainScenario } from 'apps/update-streams/src/scenario/main.scenario'
import { ScheduledService } from 'apps/update-streams/src/service/scheduled.service'
import { ChatDeletingQueuesModule } from '@app/chat-deleting-queues/chat-deleting-queues.module'
import { ChatEventsBundleQueuesModule } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'
import { StreamsModule } from '@app/streams/streams.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    ChatDeletingQueuesModule,
    ChatEventsBundleQueuesModule,
    YoutubeAppModule,
    StreamsModule,
    StreamStatsModule,
    YoutubeInfraModule
  ],
  controllers: [],
  providers: [
    MainScenario,
    EndLivesScenario,
    HandleScheduledScenario,
    MainService,
    ScheduledService
  ]
})
export class MainModule {}
