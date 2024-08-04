import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CloudSchedulersYoutubeController } from '@presentation/cloud-schedulers/cloud-schedulers-youtube.controller'
import { HealthController } from '@presentation/health/health.controller'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'
import { CloudSchedulersYoutubeModule } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.module'
import { LibModule } from '@app/lib/lib.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibModule,
    YoutubePresentationModule,
    CloudSchedulersYoutubeModule
  ],
  controllers: [HealthController, CloudSchedulersYoutubeController],
  providers: []
})
export class ClosedApiServerModule {}
