import { Module } from '@nestjs/common'
import { MembershipSummariesController } from '@presentation/membership-summaries/membership-summaries.controller'
import { MembershipSummariesScenario } from '@presentation/membership-summaries/membership-summaries.scenario'
import { MembershipSummariesAppModule } from '@app/membership-summaries/membership-summaries.module'

@Module({
  imports: [MembershipSummariesAppModule],
  controllers: [MembershipSummariesController],
  providers: [MembershipSummariesScenario]
})
export class MembershipSummariesPresentationModule {}
