import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SubscriberMilestoneRepositoryImpl } from '@infra/subscriber-milestone/SubscriberMilestone.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SubscriberMilestoneRepositoryImpl,
    {
      provide: 'SubscriberMilestoneRepository',
      useClass: SubscriberMilestoneRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    SubscriberMilestoneRepositoryImpl,
    {
      provide: 'SubscriberMilestoneRepository',
      useClass: SubscriberMilestoneRepositoryImpl
    }
  ]
})
export class SubscriberMilestoneInfraModule {}
