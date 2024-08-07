import { Module } from '@nestjs/common'
import { ChartsScenario } from '@app/hololive/charts/charts.scenario'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [],
  providers: [ChartsScenario],
  exports: [ChartsScenario]
})
export class HololiveAppModule {}
