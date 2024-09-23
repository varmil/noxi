import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'
import { MainService } from './main.service'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    YoutubeAppModule,
    YoutubeInfraModule
  ],
  controllers: [],
  providers: [MainService]
})
export class MainModule {}
