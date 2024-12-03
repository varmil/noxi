import { Module } from '@nestjs/common'
import { XController } from '@presentation/x/x.controller'
import { XScenario } from '@presentation/x/x.scenario'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [SupersBundlesAppModule, YoutubeAppModule],
  controllers: [XController],
  providers: [XScenario]
})
export class XPresentationModule {}
