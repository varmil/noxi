import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LibAppModule } from '@app/lib/lib.app.module'
import { PubsubhubbubAppModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    PubsubhubbubAppModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
