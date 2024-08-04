import { Controller, Get } from '@nestjs/common';
import { HololiveSaveAggregationsByChannelService } from './hololive-save-aggregations-by-channel.service';

@Controller()
export class HololiveSaveAggregationsByChannelController {
  constructor(private readonly hololiveSaveAggregationsByChannelService: HololiveSaveAggregationsByChannelService) {}

  @Get()
  getHello(): string {
    return this.hololiveSaveAggregationsByChannelService.getHello();
  }
}
