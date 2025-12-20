import { Module } from '@nestjs/common'
import { DayOfWeekDistributionsService } from '@app/day-of-week-distributions/day-of-week-distributions.service'
import { DayOfWeekDistributionInfraModule } from '@infra/day-of-week-distribution/day-of-week-distribution.infra.module'

@Module({
  imports: [DayOfWeekDistributionInfraModule],
  providers: [DayOfWeekDistributionsService],
  exports: [DayOfWeekDistributionInfraModule, DayOfWeekDistributionsService]
})
export class DayOfWeekDistributionsModule {}
