import { Controller, Get } from '@nestjs/common';
import { UpdateChatsService } from './update-chats.service';

@Controller()
export class UpdateChatsController {
  constructor(private readonly updateChatsService: UpdateChatsService) {}

  @Get()
  getHello(): string {
    return this.updateChatsService.getHello();
  }
}
