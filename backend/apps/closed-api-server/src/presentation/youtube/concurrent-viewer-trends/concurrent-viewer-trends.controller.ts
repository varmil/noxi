import {
  
  Controller,
  Get,
  Query,
  
} from '@nestjs/common'
import { ConcurrentViewerTrendsService } from '@app/concurrent-viewer-trends/concurrent-viewer-trends.service'
import { GetConcurrentViewerTrendsDto } from './dto/get-concurrent-viewer-trends.dto'

@Controller('youtube/concurrent-viewer-trends')
export class ConcurrentViewerTrendsController {
  constructor(
    private readonly concurrentViewerTrendsService: ConcurrentViewerTrendsService
  ) {}

  @Get()
  async getConcurrentViewerTrends(@Query() dto: GetConcurrentViewerTrendsDto) {
    return await this.concurrentViewerTrendsService.findAll({
      where: {
        dateRange: dto.toDateRange(),
        group: dto.toGroupId()
      }
    })
  }
}
