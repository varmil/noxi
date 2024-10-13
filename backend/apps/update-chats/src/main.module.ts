import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'
import { StreamsModule } from '@app/streams/stream.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { MainScenario } from './scenario/main.scenario'
import { MainService } from './service/main.service'
import { SuperChatsService } from './service/super-chats.service'
import { SuperStickersService } from './service/super-stickers.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    YoutubeAppModule,
    StreamsModule,
    StreamStatsModule
  ],
  controllers: [],
  providers: [
    MainScenario,
    MainService,
    SuperChatsService,
    SuperStickersService
  ]
})
export class MainModule {}
