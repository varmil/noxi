import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'
import { StreamsModule } from '@app/streams/streams.module'
import { SuperChatsModule } from '@app/super-chats/super-chats.module'
import { SuperStickersModule } from '@app/super-stickers/super-stickers.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { MainScenario } from './scenario/main.scenario'
import { MainService } from './service/main.service'
import { SaveSuperChatsService } from './service/save-super-chats.service'
import { SaveSuperStickersService } from './service/save-super-stickers.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    GroupsAppModule,
    YoutubeAppModule,
    StreamsModule,
    StreamStatsModule,
    SuperChatsModule,
    SuperStickersModule
  ],
  controllers: [],
  providers: [
    MainScenario,
    MainService,
    SaveSuperChatsService,
    SaveSuperStickersService
  ]
})
export class MainModule {}
