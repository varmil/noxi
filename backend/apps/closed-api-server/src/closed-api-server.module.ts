import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CloudSchedulersPresentationModule } from '@presentation/cloud-schedulers/cloud-schedulers.presentation.module'
import { HealthController } from '@presentation/health/health.controller'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'
import { CloudSchedulersYoutubeAppModule } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    CloudSchedulersPresentationModule,
    YoutubePresentationModule,
    CloudSchedulersYoutubeAppModule
  ],
  controllers: [HealthController],
  providers: []
})
export class ClosedApiServerModule {}
