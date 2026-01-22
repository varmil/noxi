import { Module } from '@nestjs/common'
import { StreamVolumeTrendsController } from '@presentation/insights/stream-volume-trends/stream-volume-trends.controller'
import { StreamVolumeTrendsModule } from '@app/stream-volume-trends/stream-volume-trends.module'

@Module({
  imports: [StreamVolumeTrendsModule],
  controllers: [StreamVolumeTrendsController],
  providers: []
})
export class StreamVolumeTrendsPresentationModule {}
