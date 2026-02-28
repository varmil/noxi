import { Module } from '@nestjs/common'
import { SubscriberMilestoneService } from '@app/subscriber-milestone/subscriber-milestone.service'
import { SubscriberMilestoneInfraModule } from '@infra/subscriber-milestone/subscriber-milestone.infra.module'

@Module({
  imports: [SubscriberMilestoneInfraModule],
  providers: [SubscriberMilestoneService],
  exports: [SubscriberMilestoneService]
})
export class SubscriberMilestoneAppModule {}
