import { Module } from '@nestjs/common'
import { ConcurrentViewerTrendsService } from '@app/concurrent-viewer-trends/concurrent-viewer-trends.service'
import { ConcurrentViewerTrendInfraModule } from '@infra/concurrent-viewer-trend/concurrent-viewer-trend.infra.module'

@Module({
  imports: [ConcurrentViewerTrendInfraModule],
  providers: [ConcurrentViewerTrendsService],
  exports: [ConcurrentViewerTrendInfraModule, ConcurrentViewerTrendsService]
})
export class ConcurrentViewerTrendsModule {}
