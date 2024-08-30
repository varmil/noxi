import { Module } from '@nestjs/common'
import { CloudSchedulersYoutubeScenario } from '@app/cloud-schedulers/youtube/cloud-schedulers-youtube.scenario'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [YoutubeInfraModule],
  controllers: [],
  providers: [CloudSchedulersYoutubeScenario],
  exports: [CloudSchedulersYoutubeScenario]
})
export class CloudSchedulersYoutubeAppModule {}
