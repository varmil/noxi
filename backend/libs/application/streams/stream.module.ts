import { Module } from '@nestjs/common'
import { StreamsService } from '@app/streams/streams.service'

@Module({
  imports: [],
  providers: [StreamsService],
  exports: [StreamsService]
})
export class StreamsModule {}
