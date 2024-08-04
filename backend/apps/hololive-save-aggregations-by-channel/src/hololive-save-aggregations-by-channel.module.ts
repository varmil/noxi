import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LibAppModule } from '@app/lib/lib.app.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    // NOTE: firebase使わなくなれば不要
    LibAppModule,
    YoutubeAppModule
  ],
  controllers: [],
  providers: []
})
export class HololiveSaveAggregationsByChannelModule {}
