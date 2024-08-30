import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CloudSchedulersPresentationModule } from '@presentation/cloud-schedulers/cloud-schedulers.presentation.module'
import { GroupsPresentationModule } from '@presentation/group/groups.presentation.module'
import { HealthController } from '@presentation/health/health.controller'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    CloudSchedulersPresentationModule,
    GroupsPresentationModule,
    YoutubePresentationModule
  ],
  controllers: [HealthController],
  providers: []
})
export class ClosedApiServerModule {}
