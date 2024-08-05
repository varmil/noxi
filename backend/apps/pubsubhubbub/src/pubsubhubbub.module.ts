import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PubsubhubbubService } from './pubsubhubbub.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME })
  ],
  controllers: [],
  providers: [PubsubhubbubService]
})
export class PubsubhubbubModule {}
