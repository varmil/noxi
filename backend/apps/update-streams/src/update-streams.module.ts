import { Module } from '@nestjs/common';
import { UpdateStreamsController } from './update-streams.controller';
import { UpdateStreamsService } from './update-streams.service';

@Module({
  imports: [],
  controllers: [UpdateStreamsController],
  providers: [UpdateStreamsService],
})
export class UpdateStreamsModule {}
