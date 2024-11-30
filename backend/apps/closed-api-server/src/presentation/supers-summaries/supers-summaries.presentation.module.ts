import { Module } from '@nestjs/common'
import { SupersSummariesController } from '@presentation/supers-summaries/supers-summaries.controller'
import { SupersSummariesAppModule } from '@app/supers-summaries/supers-summaries.module'

@Module({
  imports: [SupersSummariesAppModule],
  controllers: [SupersSummariesController],
  providers: []
})
export class SupersSummariesPresentationModule {}
