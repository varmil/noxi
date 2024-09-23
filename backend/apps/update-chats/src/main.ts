import { NestFactory } from '@nestjs/core';
import { UpdateChatsModule } from './update-chats.module';

async function bootstrap() {
  const app = await NestFactory.create(UpdateChatsModule);
  await app.listen(3000);
}
bootstrap();
