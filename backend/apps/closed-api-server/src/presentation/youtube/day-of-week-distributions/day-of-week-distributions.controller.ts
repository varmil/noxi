import {
  
  Controller,
  Get,
  Query,
  
} from '@nestjs/common'
import { DayOfWeekDistributionsService } from '@app/day-of-week-distributions/day-of-week-distributions.service'
import { GetDayOfWeekDistributionDto } from './dto/get-day-of-week-distribution.dto'

@Controller('youtube/day-of-week-distribution')
export class DayOfWeekDistributionsController {
  constructor(
    private readonly dayOfWeekDistributionsService: DayOfWeekDistributionsService
  ) {}

  @Get()
  async getDayOfWeekDistribution(@Query() dto: GetDayOfWeekDistributionDto) {
    return await this.dayOfWeekDistributionsService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      }
    })
  }
}
