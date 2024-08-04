import { Module } from '@nestjs/common';
import { HololiveSaveAggregationsByChannelController } from './hololive-save-aggregations-by-channel.controller';
import { HololiveSaveAggregationsByChannelService } from './hololive-save-aggregations-by-channel.service';

@Module({
  imports: [],
  controllers: [HololiveSaveAggregationsByChannelController],
  providers: [HololiveSaveAggregationsByChannelService],
})
export class HololiveSaveAggregationsByChannelModule {}
