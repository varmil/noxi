import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { StreamVolumeTrendsService } from '@app/stream-volume-trends/stream-volume-trends.service'
import { GetStreamVolumeTrendsDto } from './dto/get-stream-volume-trends.dto'

@Controller('youtube/stream-volume-trends')
@UseInterceptors(ClassSerializerInterceptor)
export class StreamVolumeTrendsController {
  constructor(
    private readonly streamVolumeTrendsService: StreamVolumeTrendsService
  ) {}

  @Get()
  async getStreamVolumeTrends(@Query() dto: GetStreamVolumeTrendsDto) {
    return await this.streamVolumeTrendsService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      }
    })
  }
}
