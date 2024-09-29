import { Module } from '@nestjs/common'
import { StreamsService } from '@app/streams/streams.service'
import { StreamInfraModule } from '@infra/stream/stream.infra.module'

@Module({
  imports: [StreamInfraModule],
  providers: [StreamsService],
  exports: [StreamInfraModule, StreamsService]
})
export class StreamsModule {}
