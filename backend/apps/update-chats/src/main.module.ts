import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheService } from 'apps/update-chats/src/service/cache.service'
import { SaveMembershipsService } from 'apps/update-chats/src/service/save-memberships.service'
import { LibAppModule } from '@app/lib/lib.app.module'
import { MembershipsModule } from '@app/memberships/memberships.module'
import { NextContinuationModule } from '@app/next-continuation/next-continuation.module'
import { StreamsModule } from '@app/streams/streams.module'
import { SuperChatsModule } from '@app/super-chats/super-chats.module'
import { SuperStickersModule } from '@app/super-stickers/super-stickers.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { YoutubeiInfraModule } from '@infra/service/youtubei'
import { MainScenario } from './scenario/main.scenario'
import { MainService } from './service/main.service'
import { SaveSuperChatsService } from './service/save-super-chats.service'
import { SaveSuperStickersService } from './service/save-super-stickers.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    NextContinuationModule,
    YoutubeAppModule,
    MembershipsModule,
    StreamsModule,
    SuperChatsModule,
    SuperStickersModule,
    YoutubeiInfraModule
  ],
  controllers: [],
  providers: [
    CacheService,
    MainScenario,
    MainService,
    SaveMembershipsService,
    SaveSuperChatsService,
    SaveSuperStickersService
  ]
})
export class MainModule {}
