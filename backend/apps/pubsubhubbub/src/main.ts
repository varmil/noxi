import { NestFactory } from '@nestjs/core';
import { PubsubhubbubModule } from './pubsubhubbub.module';

async function bootstrap() {
  const app = await NestFactory.create(PubsubhubbubModule);
  await app.listen(3000);
}
bootstrap();
