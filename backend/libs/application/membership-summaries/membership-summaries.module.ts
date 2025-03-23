import { Module } from '@nestjs/common'
import { MembershipSummariesService } from '@app/membership-summaries/membership-summaries.service'
import { MembershipSummaryInfraModule } from '@infra/membership-summary/membership-summary.infra.module'

@Module({
  imports: [MembershipSummaryInfraModule],
  providers: [MembershipSummariesService],
  exports: [MembershipSummaryInfraModule, MembershipSummariesService]
})
export class MembershipSummariesAppModule {}
