import { Controller, Get, Query } from '@nestjs/common'
import { GoldenTimesService } from '@app/golden-times/golden-times.service'
import { GetGoldenTimesDto } from './dto/get-golden-times.dto'

@Controller('youtube/golden-times')
export class GoldenTimesController {
  constructor(private readonly goldenTimesService: GoldenTimesService) {}

  @Get()
  async getGoldenTimes(@Query() dto: GetGoldenTimesDto) {
    return await this.goldenTimesService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      }
    })
  }
}
