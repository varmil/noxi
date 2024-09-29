import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChatBundleQueuesModule } from '@app/chat-bundle-queues/chat-bundle-queues.module'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'
import { MainService } from './main.service'
import { MainScenario } from './scenario/main.scenario'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    ChatBundleQueuesModule,
    StreamStatsModule,
    YoutubeAppModule,
    YoutubeInfraModule
  ],
  controllers: [],
  providers: [MainScenario, MainService]
})
export class MainModule {}
