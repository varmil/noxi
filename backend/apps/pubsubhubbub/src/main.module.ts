import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LibAppModule } from '@app/lib/lib.app.module'
import { PubsubhubbubModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    PubsubhubbubModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
