import { Test, TestingModule } from '@nestjs/testing';
import { HololiveSaveAggregationsByChannelController } from './hololive-save-aggregations-by-channel.controller';
import { HololiveSaveAggregationsByChannelService } from './hololive-save-aggregations-by-channel.service';

describe('HololiveSaveAggregationsByChannelController', () => {
  let hololiveSaveAggregationsByChannelController: HololiveSaveAggregationsByChannelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HololiveSaveAggregationsByChannelController],
      providers: [HololiveSaveAggregationsByChannelService],
    }).compile();

    hololiveSaveAggregationsByChannelController = app.get<HololiveSaveAggregationsByChannelController>(HololiveSaveAggregationsByChannelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hololiveSaveAggregationsByChannelController.getHello()).toBe('Hello World!');
    });
  });
});
