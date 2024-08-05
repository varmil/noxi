import { Module } from '@nestjs/common';
import { PubsubhubbubController } from './pubsubhubbub.controller';
import { PubsubhubbubService } from './pubsubhubbub.service';

@Module({
  imports: [],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubService],
})
export class PubsubhubbubModule {}
