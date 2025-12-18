import { Module } from '@nestjs/common'
import { StreamVolumeTrendsService } from '@app/stream-volume-trends/stream-volume-trends.service'
import { StreamVolumeTrendInfraModule } from '@infra/stream-volume-trend/stream-volume-trend.infra.module'

@Module({
  imports: [StreamVolumeTrendInfraModule],
  providers: [StreamVolumeTrendsService],
  exports: [StreamVolumeTrendInfraModule, StreamVolumeTrendsService]
})
export class StreamVolumeTrendsModule {}
