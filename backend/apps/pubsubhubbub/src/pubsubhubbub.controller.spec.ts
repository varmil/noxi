import { Test, TestingModule } from '@nestjs/testing';
import { PubsubhubbubController } from './pubsubhubbub.controller';
import { PubsubhubbubService } from './pubsubhubbub.service';

describe('PubsubhubbubController', () => {
  let pubsubhubbubController: PubsubhubbubController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PubsubhubbubController],
      providers: [PubsubhubbubService],
    }).compile();

    pubsubhubbubController = app.get<PubsubhubbubController>(PubsubhubbubController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pubsubhubbubController.getHello()).toBe('Hello World!');
    });
  });
});
