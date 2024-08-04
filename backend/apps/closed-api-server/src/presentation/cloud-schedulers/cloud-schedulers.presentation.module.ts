import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeController } from '@presentation/cloud-schedulers/cloud-schedulers-youtube.controller'
import { CloudSchedulersYoutubeAppModule } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.app.module'

@Module({
  imports: [CloudSchedulersYoutubeAppModule],
  controllers: [CloudSchedulersYoutubeController],
  providers: []
})
export class CloudSchedulersPresentationModule {}
