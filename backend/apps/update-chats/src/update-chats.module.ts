import { Module } from '@nestjs/common';
import { UpdateChatsController } from './update-chats.controller';
import { UpdateChatsService } from './update-chats.service';

@Module({
  imports: [],
  controllers: [UpdateChatsController],
  providers: [UpdateChatsService],
})
export class UpdateChatsModule {}
