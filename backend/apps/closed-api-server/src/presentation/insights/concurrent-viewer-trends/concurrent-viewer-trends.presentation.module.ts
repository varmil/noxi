import { Module } from '@nestjs/common'
import { ConcurrentViewerTrendsController } from '@presentation/insights/concurrent-viewer-trends/concurrent-viewer-trends.controller'
import { ConcurrentViewerTrendsModule } from '@app/concurrent-viewer-trends/concurrent-viewer-trends.module'

@Module({
  imports: [ConcurrentViewerTrendsModule],
  controllers: [ConcurrentViewerTrendsController],
  providers: []
})
export class ConcurrentViewerTrendsPresentationModule {}
