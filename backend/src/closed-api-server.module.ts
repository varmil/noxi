import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { YoutubeModule } from '@app/youtube/youtube.module'
import { AppController } from './presentation-application/app.controller'
import { AppService } from './presentation-application/app.service'
import { LibModule } from './presentation-application/lib/lib.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibModule,
    YoutubeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class ClosedApiServerModule {}
