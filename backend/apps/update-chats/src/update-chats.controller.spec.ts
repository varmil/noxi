import { Test, TestingModule } from '@nestjs/testing';
import { UpdateChatsController } from './update-chats.controller';
import { UpdateChatsService } from './update-chats.service';

describe('UpdateChatsController', () => {
  let updateChatsController: UpdateChatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateChatsController],
      providers: [UpdateChatsService],
    }).compile();

    updateChatsController = app.get<UpdateChatsController>(UpdateChatsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(updateChatsController.getHello()).toBe('Hello World!');
    });
  });
});
