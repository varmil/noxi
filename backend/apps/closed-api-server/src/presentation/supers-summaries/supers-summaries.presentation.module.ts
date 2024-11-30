import { Module } from '@nestjs/common'
import { SupersSummariesController } from '@presentation/supers-summaries/supers-summaries.controller'
import { SupersSummariesAppModule } from '@app/supers-summaries/supers-summaries.module'
import { SupersSummariesScenario } from '@presentation/supers-summaries/supers-summaries.scenario'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'

@Module({
  imports: [SupersBundlesAppModule, SupersSummariesAppModule],
  controllers: [SupersSummariesController],
  providers: [SupersSummariesScenario]
})
export class SupersSummariesPresentationModule {}
