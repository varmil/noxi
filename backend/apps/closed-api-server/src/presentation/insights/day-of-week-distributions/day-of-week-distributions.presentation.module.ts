import { Module } from '@nestjs/common'
import { DayOfWeekDistributionsController } from '@presentation/insights/day-of-week-distributions/day-of-week-distributions.controller'
import { DayOfWeekDistributionsModule } from '@app/day-of-week-distributions/day-of-week-distributions.module'

@Module({
  imports: [DayOfWeekDistributionsModule],
  controllers: [DayOfWeekDistributionsController],
  providers: []
})
export class DayOfWeekDistributionsPresentationModule {}
