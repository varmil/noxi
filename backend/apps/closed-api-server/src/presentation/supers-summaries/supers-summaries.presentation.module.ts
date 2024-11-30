import { Module } from '@nestjs/common'
import { SupersSummariesAppModule } from '@app/supers-summaries/supers-summaries.module'
import { SupersSummariesController } from '@presentation/supers-summaries/supers-summaries.controller'

@Module({
  imports: [SupersSummariesAppModule],
  controllers: [SupersSummariesController],
  providers: []
})
export class SupersSummariesPresentationModule {}
