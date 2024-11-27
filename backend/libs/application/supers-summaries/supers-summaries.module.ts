import { Module } from '@nestjs/common'
import { SupersSummariesService } from '@app/supers-summaries/supers-summaries.service'
import { SupersSummaryInfraModule } from '@infra/supers-summary/supers-summary.infra.module'

@Module({
  imports: [SupersSummaryInfraModule],
  providers: [SupersSummariesService],
  exports: [SupersSummaryInfraModule, SupersSummariesService]
})
export class SupersSummariesModule {}
